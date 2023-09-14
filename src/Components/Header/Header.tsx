import { useContext, useState } from "react";
import "./Header.css";
import ThemeButton from "../ThemeButton/ThemeButton";
import { BsBell, BsXLg } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { DataContext } from "../../Contexts/DataContext";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";
import { toast } from "react-hot-toast";

const Header = () => {
  const { data, dispatch } = useContext(DataContext);
  const { setToken } = useContext(AuthContext);

  const [showNotifications, setShowNotifications] = useState(false);

  const acceptInvite = async (workplaceId: string, workplaceName: string) => {
    dispatch({ type: "DELETE_INVITATION", payload: workplaceId });
    try {
      const {
        data: { workplace },
      } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/workplace/accept`,
        { workplaceId, workplaceName },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({
        type: "JOIN_WORKPLACE",
        payload: workplace,
      });
      toast.success(`Joined ${workplaceName}`);
    } catch (error) {
      toast.error("Couldn't join workplace, try again in a bit");
    }
  };

  const declineInvite = async (workplaceId: string, workplaceName: string) => {
    dispatch({ type: "DELETE_INVITATION", payload: workplaceId });
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/workplace/decline`,
        {
          workplaceId,
          workplaceName,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      toast.error("Couldn't decline invitation, try again in a bit");
    }
  };

  return (
    <>
      <div className="header-placeholder"></div>

      <header className="top-bar">
        <span className="logo">TaskLeafs</span>
        <button
          title="Notifications"
          className="notification-bell"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          {Boolean(data.invitations.length) && <b>{data.invitations.length}</b>}
          <BsBell size={"1.5rem"} />
        </button>
        <button
          className="logout-btn"
          onClick={() => {
            setToken!(null);
            localStorage.removeItem("token");
          }}
        >
          <AiOutlineLogout size={"1.5rem"} />
        </button>
        <ThemeButton />
        {showNotifications && (
          <div className="notification-modal">
            <button
              onClick={() => setShowNotifications(false)}
              title="close modal"
            >
              <BsXLg size={"1.5rem"} />
            </button>
            {data.invitations.length ? (
              <div className="notification-modal-content">
                {data.invitations.map(({ workplaceId, name }) => (
                  <span className="invitation" key={"invitation" + workplaceId}>
                    {" "}
                    You have been invited to join "{name}"
                    <span>
                      <button onClick={() => acceptInvite(workplaceId, name)}>
                        Accept
                      </button>
                      <button onClick={() => declineInvite(workplaceId, name)}>
                        Decline
                      </button>
                    </span>
                  </span>
                ))}
              </div>
            ) : (
              <div className="notification-modal-no">
                <p>No Notifications</p>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
