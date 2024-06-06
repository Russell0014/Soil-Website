import {
  compareUserPassword,
  findUserByEmail,
  findUserByUsername,
} from "../service/user";
import { User } from "./user";

async function validateUsername(v: Record<string, string>, u: User) {
  // no changes don't bother, might be a problem l8r on idk
  if (v.username == u.username) return "";
  else if (!v.username) return "Enter a username!";
  else if (v.username.length < 5)
    return "Username must be \u2265 5 characters in length";
  else if (await findUserByUsername(v.username))
    return "Username is already taken!";
  return "";
}

async function validateEmail(v: Record<string, string>, u: User) {
  if (v.email == u.email) return "";
  else if (!v.email) return "Enter a email!";
  else if (!/\S+@\S+\.\S+/.test(v.email)) return "Enter a valid email address!";
  else if (await findUserByEmail(v.email)) return "Email already taken!";

  return "";
}

async function validateOldPassword(
  user_id: number,
  password: string | undefined
) {
  if (!password) return "Confirm your current password!";
  const isSame = await compareUserPassword(user_id, password);

  if (!isSame) return "Password does not match!";
  return "";
}

function validateNewPassword(v: Record<string, string>) {
  const exp = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+-={};':,.<>?/|\\\"])"
  );

  if (v.confirmNewPassword && !v.newPassword) return "Enter a password!";
  else if (v.newPassword && v.newPassword.length < 10)
    return "Password must be \u2265 10 characters in length";
  else if (v.newPassword && !exp.test(v.newPassword)) return "!"; // output jsx

  return "";
}

function validateConfirmPassword(v: Record<string, string>) {
  if (v.newPassword && !v.confirmNewPassword) return "Confirm your password!";
  else if (v.newPassword && v.newPassword !== v.confirmNewPassword)
    return "Passwords must be the same!";
  return "";
}

async function validateEdit(v: Record<string, string>, u: User | undefined) {
  const errors: Record<string, string> = {};

  if (u === undefined)
    throw new Error("User is undefined when editing profile");

  if (await validateUsername(v, u))
    errors.username = await validateUsername(v, u);
  if (await validateEmail(v, u)) errors.email = await validateEmail(v, u);

  // validate the old
  const comparePasswordInvalid = await validateOldPassword(
    u.user_id,
    v.oldPassword
  );
  if (comparePasswordInvalid) errors.oldPassword = comparePasswordInvalid;

  // validate new password and confirm
  if (validateNewPassword(v)) errors.newPassword = validateNewPassword(v);
  if (validateConfirmPassword(v))
    errors.confirmNewPassword = validateConfirmPassword(v);

  return errors;
}

function checkIfEdited(v: Record<string, string>, u: User | undefined) {
  if (v.username != u?.username) return true;
  if (v.email != u?.email) return true;
  if (v.newPassword) return true;
  return false;
}

export { validateEdit, checkIfEdited };
