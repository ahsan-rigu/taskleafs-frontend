import React, { useContext, useRef } from "react";
import mongoose from "mongoose";
import { DataContext } from "../../../Contexts/DataContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoLinkExternal } from "react-icons/go";
import { toast } from "react-hot-toast";

interface Props {
  workplace: any;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  currentTab: string;
}
const Sidebar: React.FC<Props> = ({ workplace, setCurrentTab, currentTab }) => {
  const { dispatch } = useContext(DataContext);
  const [sidebarActive, setSidebarActive] = React.useState(true);

  const windowWidth = useRef(window.innerWidth);

  const addBranch = async (event: any) => {
    event.preventDefault();
    const branch = {
      _id: new mongoose.Types.ObjectId(),
      branchName: event.target[0].value,
      leafs: [],
    };
    dispatch({
      type: "ADD_BRANCH",
      payload: {
        branch: { ...branch, _id: branch._id.toString() },
        workplaceId: workplace._id,
      },
    });
    setCurrentTab(branch._id.toString());
    if (windowWidth.current < 768) setSidebarActive(false);
    event.target[0].value = "";
    event.target[0].blur();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/branch`,
        { branch, workplaceId: workplace._id },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className={"sidebar-wrapper " + (sidebarActive ? "active" : "inactive")}
    >
      <label className="hamburger">
        <input
          title="sidebar button"
          type="checkbox"
          onChange={(e) => setSidebarActive(e.target.checked)}
          checked={sidebarActive}
        />
        <svg viewBox="0 0 32 32">
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path className="line" d="M7 16 27 16"></path>
        </svg>
      </label>
      <aside className="sidebar ">
        <header>
          <Link to="/dashboard" className="dashboard-link">
            back to dashboard
            <GoLinkExternal size={"1rem"} />
          </Link>
        </header>
        <button
          className={
            currentTab === "overview"
              ? "active workplace-btn f-ssm"
              : "workplace-btn f-ssm"
          }
          onClick={() => {
            setCurrentTab("overview");
            if (windowWidth.current < 768) setSidebarActive(false);
          }}
        >
          {workplace?.name}
        </button>
        <div className="branches-list">
          {workplace?.branches.map((branch: any) => (
            <button
              className={
                currentTab === branch._id
                  ? "active workplace-btn f-ssm"
                  : "workplace-btn f-ssm"
              }
              key={branch._id}
              onClick={() => {
                setCurrentTab(branch._id);
                if (windowWidth.current < 768) setSidebarActive(false);
              }}
            >
              {branch.branchName}
            </button>
          ))}
          <form className="add-branch" onSubmit={addBranch}>
            <input
              type="text"
              placeholder="add branch"
              minLength={8}
              maxLength={24}
            />
            <button>+</button>
          </form>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
