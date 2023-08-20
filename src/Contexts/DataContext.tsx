import React, { useEffect } from "react";
import axios from "axios";
import { userReducer } from "../Reducers/userReducer";
import { Interface } from "readline";
import { AuthContext } from "./AuthContext";

interface User {
  name: string;
  username: string;
  password: undefined;
  profilePicture: string;
  perosonalWorkplace: Object;
  workspaces: Array<any>;
  invitations: Array<any>;
}

interface Data {
  user: User;
  workplaces: Array<Object>;
}

interface Props {
  children: React.ReactNode;
}

interface Value {
  data: Data | {} | any;
  dispatch?: React.Dispatch<any>;
}

export const DataContext = React.createContext<any>({
  data: {},
  dispatch: undefined,
});

const DataContextProvider: React.FC<Props> = ({ children }) => {
  const { token } = React.useContext(AuthContext);
  const [data, dispatch] = React.useReducer(userReducer, {});

  const getInitialState = async () => {
    console.log(token);
    try {
      const {
        data: { user },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "SET_DATA", payload: user });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getInitialState();
    }
  }, [token]);

  console.log(data);

  return (
    <DataContext.Provider value={{ data, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
