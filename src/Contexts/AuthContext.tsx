import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Value } from "../Schemas/AuthSchemas";

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<Value>({});

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
      await signIn(username, password);
      return { message };
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  };

  const authorizeToken = async () => {
    const token: string | null = localStorage.getItem("token");
    try {
      if (token) {
        await axios.post(
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
