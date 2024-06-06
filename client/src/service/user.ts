import axios from "axios";
import config from "./config";
import { User } from "../utils/user";

// find why set timeout handler took x time
export async function findUserByUsername(username: string) {
  try {
    const res = await axios.get(`${config.HOST}/user/username/${username}`);
    return res.data.length > 0;
  } catch {
    return false;
  }
}

export async function findUserByEmail(email: string) {
  try {
    const res = await axios.get(`${config.HOST}/user/email/${email}`);
    return res.data.length > 0;
  } catch {
    return false;
  }
}

export async function createUser(v: Record<string, string>) {
  try {
    const res = await axios.post(`${config.HOST}/user`, {
      username: v.username,
      email: v.email,
      password: v.password,
    });
    return res.data.length == 0; // [] is returned
  } catch (e) {
    return false;
  }
}

export async function getRegisteredUser(
  email: string
): Promise<User | undefined> {
  try {
    const res = await axios.get(`${config.HOST}/user/email/${email}`);
    return res.data.at(0);
  } catch {
    return undefined;
  }
}

export async function compareUserPassword(user_id: number, password: string) {
  try {
    const res = await axios.get(
      `${config.HOST}/user/compare/${user_id}/${password}`
    );
    return res.data.compare;
  } catch {
    return false;
  }
}

export async function updateUserDetails(
  user_id: number,
  v: Record<string, string>
) {
  try {
    const res = await axios.patch(`${config.HOST}/user/`, {
      user_id: user_id,
      username: v.username,
      email: v.email,
      password: v.newPassword || v.oldPassword,
    });
    return res.data.length > 0;
  } catch {
    return false;
  }
}

export async function deleteUser(user_id: number) {
  try {
    const res = await axios.delete(`${config.HOST}/user/${user_id}`);
    return res.data.length == 0; // meaning no errors, [] return
  } catch {
    return false;
  }
}
