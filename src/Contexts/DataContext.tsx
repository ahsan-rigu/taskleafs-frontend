import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { userReducer } from "../Reducers/userReducer";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";
import { User } from "../Schemas/DataSchema";
import io from "socket.io-client";

interface Props {
  children: React.ReactNode;
}

type Value = {
  data: User;
  loading: boolean;
  dispatch: React.Dispatch<any>;
};

const initialState: User = {
  _id: "",
  name: "",
  password: undefined,
  profilePicture: "",
  username: "",
  workplaces: [],
  invitations: [],
};

export const DataContext = createContext<Value>({
  data: initialState,
  loading: true,
  dispatch: () => {},
});

const DataContextProvider = ({ children }: Props) => {
  const { token } = useContext(AuthContext);
  const [data, dispatch] = useReducer(userReducer, initialState);
  const [loading, setLoading] = useState<boolean>(true);

  const getInitialState = async () => {
    try {
      const {
        data: { user },
      } = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({ type: "SET_DATA", payload: user });
      const socket = io(`${process.env.REACT_APP_API_URL}`, {
        autoConnect: false,
      });
      socket.auth = {
        userId: user._id,
        workplaces: user.workplaces.map(({ _id }: { _id: string }) => _id),
      };
      socket.connect();
      socket.on("change", (data) => {
        if (!(user._id === data.origin)) {
          dispatch(data.dispatch);
          toast(data.message);
        }
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (token) {
      getInitialState();
    }
  }, [token]);

  return (
    <DataContext.Provider value={{ data, dispatch, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
