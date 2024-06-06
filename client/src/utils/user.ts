// Everything related to storing and grabbing user/users

const USER_KEY = "__USER";

export type User = {
  user_id: number;
  username: string;
  email: string;
  hash: string;
  date_joined: Date;
};

export async function saveLoggedIn(user: User): Promise<void> {
  sessionStorage.clear(); // remove other possibly added key/values
  sessionStorage.setItem(USER_KEY, JSON.stringify(user || {}));
}

export function getLoggedIn(): User | undefined {
  // we will assume that if stored and is object type it has right properties
  return JSON.parse(sessionStorage.getItem(USER_KEY) || "null"); // using null here JSON value cannot be undefined
}

export function logoutUser(): void {
  sessionStorage.removeItem(USER_KEY);
}

// {"t@t.com":{"username":"username","email":"t@t.com","password":"pswdWORK1!"},"t@t.co":{"username":"username","email":"t@t.co","password":"passWORD1!_"},"k@k.k":{"username":"my name is my name","email":"k@k.k","password":"pswdWORK1!"},"test":{"username":"test","email":"test","password":"test"},"lol@lol.com":{"username":"loluser","email":"lol@lol.com","password":"passWORD1!_"}}
