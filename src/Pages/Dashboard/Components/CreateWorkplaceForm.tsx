import React from "react";
import { DataContext } from "../../../Contexts/DataContext";
import axios from "axios";
import { BsPlusLg } from "react-icons/bs";

const CreateWorkplaceForm = () => {
  const { dispatch } = React.useContext(DataContext);

  const [showForm, setShowForm] = React.useState<boolean>(false);

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

  return (
    <>
      <button
        className="create-workplace-button f-ssm"
        onClick={() => setShowForm(true)}
      >
        {<BsPlusLg size={"1.5rem"} />}
        <span>Create Workplace</span>
      </button>
      {showForm && (
        <div className="modal-wrapper">
          <div
            className="modal-backdrop"
            onClick={() => setShowForm(false)}
          ></div>
          <div className="create-workplace modal">
            <form onSubmit={createWorkplace}>
              <input type="text" placeholder="Workplace Name" />
              <textarea placeholder="Workplace Description" />
              <button type="submit">Create Workplace</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateWorkplaceForm;
