import React from "react";
import { DataContext } from "../../../Contexts/DataContext";
import axios from "axios";

const CreateWorkplaceForm = () => {
  const { dispatch } = React.useContext(DataContext);

  const createWorkplace = async (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;
    const description = e.target[1].value;
    try {
      const response = await axios.post(
        "http://localhost:8080/api/workplace",
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({ type: "ADD_WORKPLACE", payload: response.data.workplace });
    } catch (error) {
      console.log(error);
    }
  };

  return;
  <div className="create-workplace">
    <form onSubmit={createWorkplace}>
      <input type="text" placeholder="Workplace Name" />
      <textarea placeholder="Workplace Description" />
      <button type="submit">Create Workplace</button>
    </form>
  </div>;
};

export default CreateWorkplaceForm;
