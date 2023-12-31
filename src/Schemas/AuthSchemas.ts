import React from "react";

export interface Value {
    token?: string | null;
    signIn?: (
      username: string,
      password: string
    ) => Promise<{
      message: string;
    }>;
    signUp?: (
      name: string,
      username: string,
      password: string
    ) => Promise<{
      message: string;
    }>;
    setToken?: React.Dispatch<React.SetStateAction<string | null>>
  }