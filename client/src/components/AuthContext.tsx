import { ReactNode, createContext, useContext, useState } from "react";

import { User, logoutUser, saveLoggedIn, getLoggedIn } from "../utils/user";

//import { emptyCart } from "../utils/cart";
import { getRegisteredUser } from "../service/user";

// global user state property, handles easy login and logout
// references used:
// https://ui.dev/react-router-protected-routes-authentication
// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
// https://www.youtube.com/watch?v=eFPvXGZETiY&ab_channel=CosdenSolutions

type AuthContextProps = {
  user: User | undefined;
  login: (email: string) => void;
  logout: () => void;
};

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function useAuth(): AuthContextProps {
  const [user, setUser] = useState<User | undefined>(getLoggedIn());

  const login = async (email: string) => {
    // we 100% know that if this is called then the user exists
    const user = await getRegisteredUser(email);
    saveLoggedIn(user!);
    setUser(user);
  };

  const logout = () => {
    logoutUser();
    setUser(undefined);
    localStorage.removeItem("cart_id");
    //emptyCart(user?.email || "");
  };

  return {
    user,
    login,
    logout,
  };
}

export function AuthProvider({ children }: Props) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function AuthConsumer(): AuthContextProps {
  const auth = useContext(AuthContext);

  if (!auth)
    throw new Error(
      `Error in AuthConsumer, Auth must be undefined, auth ${auth}`
    );

  return auth;
}
