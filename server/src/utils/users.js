const validate = require("validator");
const db = require("../database");

function validatePassword(password) {
  const exp = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+-={};':,.<>?/|\\\"])"
  );

  if (!password) return "Enter a password!";
  else if (password.length < 10)
    return "Password must be \u2265 10 characters in length";
  else if (!exp.test(password))
    return "Password must contain:\n -At least one lower case\n -At least one upper case\n -At least special character\n -At least one number\n";
  return "";
}

function validateUsernameEmail(username, email) {
  const errors = [];

  if (!username || !validate.isLength(username, { min: 5, max: 30 }))
    errors.push({
      property: "username",
      value: "Username must be between 5 and 30 characters",
    });

  if (!email || !validate.isEmail(email))
    errors.push({ property: "email", value: "Invalid email address" });

  return errors;
}

// extra is the additional conditions for the query
async function uniqueUsernameEmail(username, email, extra = {}) {
  const errors = [];

  const usersWithUsername = await db.users.findAll({
    where: {
      username: username,
      ...extra,
    },
  });
  if (usersWithUsername.length > 0)
    errors.push({ property: "username", value: "Username exists" });

  const usersWithEmail = await db.users.findAll({
    where: {
      email: email,
      ...extra,
    },
  });
  if (usersWithEmail.length > 0)
    errors.push({ property: "email", value: "Email exists" });

  return errors;
}

async function validateUserID(user_id) {
  if (!user_id) return "User ID is required";

  const existingUser = await db.users.findOne({
    where: { user_id: user_id },
  });
  if (!existingUser) return "User not found";

  return "";
}

module.exports = {
  validatePassword,
  validateUsernameEmail,
  uniqueUsernameEmail,
  validateUserID,
};
