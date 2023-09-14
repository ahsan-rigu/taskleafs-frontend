import { useContext, useState } from "react";
import { DataContext } from "../../../Contexts/DataContext";
import axios from "axios";
import { BsPencil, BsXLg } from "react-icons/bs";
import { toast } from "react-hot-toast";

interface Props {
  name: string;
  description: string;
  workplaceId: string;
}

const EditWorkplaceForm = ({ name, description, workplaceId }: Props) => {
  const { dispatch } = useContext(DataContext);
  const [showForm, setShowForm] = useState<boolean>(false);

  const createWorkplace = async (e: any) => {
    e.preventDefault();
    const name = e.target[1].value;
    const description = e.target[2].value;
    dispatch({
      type: "EDIT_WORKPLACE",
      payload: { name, description, workplaceId },
    });
    setShowForm(false);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/workplace/`,
        { workplaceName: name, description, workplaceId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <button
        className="dit-workplace-button f-ssm"
        onClick={() => setShowForm(true)}
      >
        {<BsPencil size={"1.25rem"} />}
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
                onClick={() => setShowForm(false)}
              >
                <BsXLg size={"1.5rem"} />
              </button>
              <input
                type="text"
                placeholder="Workplace Name"
                name="name"
                minLength={8}
                maxLength={24}
                required
                defaultValue={name}
              />
              <textarea
                placeholder="Workplace Description"
                name="discription"
                minLength={16}
                required
                defaultValue={description}
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditWorkplaceForm;
