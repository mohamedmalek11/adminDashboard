// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios
import axios from "axios";
import request from "../api/axios";

// ** Config
import authConfig from "src/configs/auth";

// ** Types
import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType,
} from "./types";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(
        authConfig.storageTokenKeyName
      )!;
      const userDataString = window.localStorage.getItem("userData")!;
      const userData: UserDataType | null = JSON.parse(userDataString);
      if (storedToken) {
        setUser(userData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    axios
      .post(`${request.defaults.baseURL}/iam/auth/staff/login`, params)
      .then(async (response) => {
        console.log(response.data);
        window.localStorage.setItem(
          authConfig.storageTokenKeyName,
          response.data.accessToken
        );
        setUser(response.data.user);
        window.localStorage.setItem(
          "userData",
          JSON.stringify(response.data.user)
        );
        return router.query.returnUrl;
      })
      .then((returnUrl) => {
        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
        router.replace(redirectURL as string);
        setLoading(false);
      })

      .catch((err) => {
        if (errorCallback) errorCallback(err);
      });
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push("/login");
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
