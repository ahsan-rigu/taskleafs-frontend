import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface Value {
  token: string | null;
  signIn: Function;
  signUp: Function;
}

export const AuthContext = createContext<Value>({
  token: null,
  signIn: () => console.log("out of context"),
  signUp: () => console.log("out of context"),
});

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const signIn = async (
    username: string,
    password: string
  ): Promise<{ message: string }> => {
    try {
      const { data } = await axios.post<{ message: string; token: string }>(
        `${process.env.REACT_APP_API_URL}/api/user/sign-in`,
        { username, password }
      );
      setToken(data.token);
      return { message: data.message };
    } catch (error: any) {
      console.log(error);
      return Promise.reject({ message: error.response.data.message });
    }
  };

  const signUp = async (
    name: string,
    username: string,
    password: string
  ): Promise<{ message: string }> => {
    try {
      const { data } = await axios.post<{ message: string }>(
        `${process.env.REACT_APP_API_URL}/api/user/sign-up`,
        { name, username, password }
      );
      signIn(username, password);
      return { message: data.message };
    } catch (error: any) {
      return Promise.reject({ message: error.response.data.message });
    }
  };

  const authorizeToken = async (): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await axios.post<{ message: string }>(
          `${process.env.REACT_APP_API_URL}/api/user/authorize-token`,
          { token }
        );
        setToken(token);
        //toast
        console.log(data.message);
      }
    } catch (error) {
      //toast
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
