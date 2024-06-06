import {
  findUserByEmail,
  findUserByUsername,
  createUser,
} from "../service/user";

// success
async function signupUser(v: Record<string, string>) {
  const res = await createUser(v);
  return res;
}

// validate
async function validateUsername(v: Record<string, string>): Promise<string> {
  if (!v.username) return "Enter a username!";
  else if (!v.username.trim()) return "Enter a username!";
  else if (v.username.length < 5)
    return "Username must be \u2265 5 characters in length";
  else if (await findUserByUsername(v.username))
    return "Username is already taken!";
  return "";
}

async function validateEmail(v: Record<string, string>): Promise<string> {
  if (!v.email) return "Enter a email!";
  else if (!/\S+@\S+\.\S+/.test(v.email)) return "Enter a valid email address!";
  else if (await findUserByEmail(v.email)) return "Email already taken!";
  return "";
}

function validatePassword(v: Record<string, string>): string {
  // https://security.harvard.edu/use-strong-passwords
  // CHANGE SPECIAL CHARACTER SECTION FOR MALICIOUS USE FOR CHARACTERS ;<>\{}[]+=?&,:'"`
  // TODO: DONT ALLOW FOR WHITESPACES BETWEEN THE PASSWORD STRING
  const exp = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+-={};':,.<>?/|\\\"])"
  );

  if (!v.password) return "Enter a password!";
  else if (v.password.length < 10)
    return "Password must be \u2265 10 characters in length";
  else if (!exp.test(v.password)) return "!"; // gonna output jsx
  return "";
}

function validateConfirmPassword(v: Record<string, string>): string {
  if (!v.cPassword) return "Confirm your password!";
  else if (v.password !== v.cPassword) return "Passwords must be the same";
  return "";
}

async function validateSignUp(v: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (await validateUsername(v)) errors.username = await validateUsername(v);
  if (await validateEmail(v)) errors.email = await validateEmail(v);
  if (validatePassword(v)) errors.password = validatePassword(v);
  if (validateConfirmPassword(v)) errors.cPassword = validateConfirmPassword(v);

  return errors;
}

export { signupUser, validateSignUp };
