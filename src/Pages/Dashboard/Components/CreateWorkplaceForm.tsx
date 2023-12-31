import { useContext, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext";
import axios from "axios";
import { BsPlusLg, BsXLg } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateWorkplaceForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(DataContext);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const createWorkplace = async (e: any) => {
    e.preventDefault();
    setShowLoader(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/workplace`,
        { name: e.target[1].value, description: e.target[2].value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({ type: "ADD_WORKPLACE", payload: response.data.workplace });
      navigate(`/wp/${response.data.workplace._id}`);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setShowLoader(false);
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
              <button
                className="close-button"
                type="button"
                title="close"
                disabled={showLoader}
                onClick={() => setShowForm(false)}
              >
                <BsXLg size={"1.5rem"} />
              </button>
              <input
                type="text"
                placeholder="Workplace Name"
                name="name"
                required
                minLength={8}
                maxLength={24}
              />
              <textarea
                placeholder="Workplace Description"
                name="discription"
                minLength={16}
                required
              />
              <button type="submit">
                {showLoader ? (
                  <ClipLoader size={".9rem"} color="#FFFFFF" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateWorkplaceForm;
