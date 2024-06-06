import { compareUserPassword, getRegisteredUser } from "../service/user";

async function validateLoginIn(v: Record<string, string>) {
  const errors: Record<string, string> = {};

  let user;
  try {
    user = await getRegisteredUser(v.email);
  } catch {
    errors.email = "Something went wrong when retrieving by email.";
  }

  if (!v.email) errors.email = "Enter an email!";
  else if (!v.email.trim()) errors.email = "Enter a email!";
  else if (!user) errors.email = "Email is not registered!";
  // else errors.email = "pass?";

  if (!v.password) errors.password = "Enter a password!";
  else if (user && !(await compareUserPassword(user.user_id, v!.password)))
    errors.password = "Password is incorrect!";
  // else errors.password = "pass?";

  return errors;
}

export { validateLoginIn };
