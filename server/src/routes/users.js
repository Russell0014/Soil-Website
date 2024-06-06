const db = require("../database");
const bcrypt = require("bcryptjs");
const {
  validatePassword,
  validateUsernameEmail,
  uniqueUsernameEmail,
  validateUserID,
} = require("../utils/users");
const { Op } = require("sequelize");

module.exports = (express, app) => {
  const userRouter = express.Router();

  // find by username
  userRouter.get("/username/:username", async (req, res) => {
    try {
      const users = await db.users.findAll({
        where: {
          username: req.params.username,
        },
      });
      res.send(users);
    } catch (e) {
      console.log(e);
      res.send([]);
    }
  });

  // find by email
  userRouter.get("/email/:email", async (req, res) => {
    try {
      const users = await db.users.findAll({
        where: {
          email: req.params.email,
        },
      });
      res.send(users);
    } catch {
      res.send([]);
    }
  });

  // compare user password
  userRouter.get("/compare/:user_id/:password", async (req, res) => {
    try {
      const { user_id, password } = req.params;

      if (!password) {
        res.send({ error: "Password is empty!", compare: false });
        return;
      }

      const idInvalid = await validateUserID(user_id);
      if (idInvalid) {
        res.send({ error: idInvalid, compare: false });
        return;
      }

      const user = await db.users.findAll({
        where: {
          user_id: user_id,
        },
      });

      const isSame = await bcrypt.compare(password, user.at(0).hash);
      const error = isSame ? "" : "Password does not match!";

      res.send({ error: error, compare: isSame });
    } catch (e) {
      console.log(e);
      res.send({ error: "Something went wrong", compare: false });
    }
  });

  // user creation
  userRouter.post("/", async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const passwordInvalid = validatePassword(password);
      if (passwordInvalid) {
        res.send([passwordInvalid]);
        return;
      }

      const errors1 = validateUsernameEmail(username, email);
      if (errors1.length > 0) {
        res.send(errors1);
        return;
      }

      const errors2 = await uniqueUsernameEmail(username, email);
      if (errors2.length > 0) {
        res.send(errors2);
        return;
      }

      const passwordHashed = await bcrypt.hash(password, 10);

      await db.users.create({
        username: username,
        email: email,
        hash: passwordHashed,
      });

      res.send([]);
    } catch (e) {
      console.log(e);
      res.send(["Server error POST"]);
    }
  });

  userRouter.patch("/", async (req, res) => {
    try {
      const { user_id, username, email, password } = req.body;

      const idInvalid = await validateUserID(user_id);
      if (idInvalid) {
        res.send([idInvalid]);
        return;
      }

      const passwordInvalid = validatePassword(password);
      if (passwordInvalid) {
        res.send([passwordInvalid]);
        return;
      }

      const errors1 = validateUsernameEmail(username, email);
      if (errors1.length > 0) {
        res.send(errors1);
        return;
      }

      const errors2 = await uniqueUsernameEmail(username, email, {
        [Op.not]: [{ user_id: [user_id] }],
      });
      if (errors2.length > 0) {
        res.send(errors2);
        return;
      }

      const passwordHashed = await bcrypt.hash(password, 10);

      await db.users.update(
        { username: username, email: email, hash: passwordHashed },
        { where: { user_id: user_id } }
      );

      res.send([]);
    } catch {
      res.send(["Internal Server Error"]);
    }
  });

  userRouter.delete("/:user_id", async (req, res) => {
    try {
      const { user_id } = req.params;

      const idInvalid = await validateUserID(user_id);
      if (idInvalid) {
        res.send([idInvalid]);
        return;
      }

      // DELETE CART STUFF AND REVIEW STUFF AS WELL!
      await db.users.destroy({ where: { user_id: user_id } });
      res.send([]);
    } catch {
      res.send(["Internal Server Error"]);
    }
  });

  app.use("/user", userRouter);
};
