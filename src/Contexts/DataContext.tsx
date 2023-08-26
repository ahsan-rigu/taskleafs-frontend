import React, { useEffect } from "react";
import axios from "axios";
import { userReducer } from "../Reducers/userReducer";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";
import { User } from "../Schemas/DataSchema";

interface Props {
  children: React.ReactNode;
}

type Value = {
  data: User;
  loading: boolean;
  dispatch: React.Dispatch<any>;
} | null;

const initialState: User = {
  _id: "",
  name: "",
  password: undefined,
  profilePicture: "",
  username: "",
  workplaces: [],
  invitations: [],
};

export const DataContext = React.createContext<any | Value>(null);

const DataContextProvider = ({ children }: Props) => {
  const { token } = React.useContext(AuthContext);
  const [data, dispatch] = React.useReducer(userReducer, initialState);
  const [loading, setLoading] = React.useState<boolean>(true);

  const getInitialState = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "SET_DATA", payload: user });
    } catch (error: any) {
      toast.error(error.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      getInitialState();
    }
  }, [token, getInitialState]);

  console.log(data);

  return (
    <DataContext.Provider value={{ data, dispatch, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
