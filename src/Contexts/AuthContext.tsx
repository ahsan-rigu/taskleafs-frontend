import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Value } from "../Schemas/AuthSchemas";

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<Value>({
  token: null,
  signIn: async (username, password) => await { message: "out of context" },
  signUp: async (name, username, password) =>
    await { message: "out of context" },
});

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const signIn = async (username: string, password: string) => {
    try {
      const {
        data: { message, token },
      } = await axios.post<{ message: string; token: string }>(
        `${process.env.REACT_APP_API_URL}/api/user/sign-in`,
        { username, password }
      );
      setToken(token);
      localStorage.setItem("token", token);
      return { message: message };
    } catch (error: any) {
      return Promise.reject({ message: error.response.data.message });
    }
  };

  const signUp = async (name: string, username: string, password: string) => {
    try {
      const {
        data: { message },
      } = await axios.post<{ message: string }>(
        `${process.env.REACT_APP_API_URL}/api/user/sign-up`,
        { name, username, password }
      );
      signIn(username, password);
      return { message };
    } catch (error: any) {
      return Promise.reject({ message: error.response.data.message });
    }
  };

  const authorizeToken = async (): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    try {
      if (token) {
        const {
          data: { message },
        } = await axios.post<{ message: string }>(
          `${process.env.REACT_APP_API_URL}/api/user/authorize-token`,
          {},
          { headers: { authorization: `Bearer ${token}` } }
        );
        setToken(token);
      }
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error);
    }
  };

  useEffect(() => {
    authorizeToken();
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, signIn, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
