import React, { useContext } from "react";
import EditWorkplaceForm from "../Components/EditWorkplaceForm";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { DataContext } from "../../../Contexts/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import { Workplace } from "../../../Schemas/DataSchema";
interface Props {
  workplace: Workplace;
}
const WorkplaceOverview = ({ workplace }: Props) => {
  const navigate = useNavigate();
  const { data, dispatch } = useContext(DataContext);
  const { workplaceId } = useParams();

  const headers = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const deleteWorkplace = async () => {
    navigate("/dashboard");
    dispatch({
      type: "DELETE_WORKPLACE",
      payload: { workplaceId },
    });
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/workplace/${workplaceId}`,
        headers
      );
      toast.success("Workplace deleted");
    } catch (error) {
      toast.error("Couldn't delete workplace, try again in a bit");
    }
  };

  const inviteMember = async (e: any) => {
    e.preventDefault();
    const username = e.target[0].value;
    e.target[0].value = "";
    e.target[0].blur();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/workplace/invite`,
        { username, workplaceId },
        headers
      );
      toast.success("Invitation sent");
    } catch (error) {
      toast.error("Couldn't send invitation, try again in a bit");
    }
  };

  const removeMember = async (_id: string) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/workplace/member/${workplaceId}/${_id}`,
        headers
      );
      if (_id === data._id) {
        dispatch({
          type: "LEAVE_WORKPLACE",
          payload: { workplaceId },
        });
        toast.success("You left the workplace");
        navigate("/dashboard");
      } else {
        toast.success("Member removed");
      }
    } catch (error) {
      toast.error("Couldn't remove member, try again in a bit");
    }
  };

  return (
    <section className="workplace-overview">
      <header>
        <h2 className="f-ssm">{workplace.name}</h2>
        {data._id === workplace.owner ? (
          <span>
            <button title="delete" onClick={deleteWorkplace}>
              <BsTrash size={"1.25rem"} />
            </button>
            <EditWorkplaceForm
              name={workplace.name}
              workplaceId={workplaceId!}
              description={workplace.description}
            />
          </span>
        ) : (
          <button
            title="leave workplace"
            className="leave-btn"
            onClick={() => removeMember(data._id)}
          >
            Leave
          </button>
        )}
      </header>
      <p className="workplace-discription">{workplace.description}</p>
      <h3 className="f-ssm">Members</h3>
      <div>
        {workplace.members?.map((member) => (
          <span key={member._id} className="member-tab">
            <span>{member.username}</span>
            {data._id === workplace.owner && data._id !== member._id && (
              <button
                title="remove member"
                onClick={() => removeMember(member._id)}
              >
                <BsTrash size={"1.25rem"} />
              </button>
            )}
          </span>
        ))}
      </div>
      {data._id === workplace.owner && (
        <form className="invite-member" onSubmit={inviteMember}>
          <span>Invite Someone:</span>
          <input type="text" placeholder="username (exact)" />
          <button type="submit">Invite</button>
        </form>
      )}
    </section>
  );
};

export default WorkplaceOverview;
