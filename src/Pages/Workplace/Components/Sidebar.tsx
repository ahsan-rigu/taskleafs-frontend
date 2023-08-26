import React from "react";
import Workplace from "../Workplace";

interface Props {
  workplace: any;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}
const Sidebar: React.FC<Props> = ({ workplace, setCurrentTab }) => {
  const [sidebarActive, setSidebarActive] = React.useState(true);

  return (
    <div
      className={"sidebar-wrapper " + (sidebarActive ? "active" : "inactive")}
    >
      <label className="hamburger">
        <input
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
        <button
          onClick={() => setCurrentTab("overview")}
          className="workplace-btn f-ssm"
        >
          {workplace?.name}
        </button>
        <div className="branches-list">
          {workplace?.branches.map((branch: any) => (
            <button
              className="workplace-btn f-ssm"
              key={branch._id}
              onClick={() => setCurrentTab(branch._id)}
            >
              {branch.branchName}
            </button>
          ))}
        </div>
        <button className="add-branch-btn f-ssm">ADD BRANCH</button>
      </aside>
    </div>
  );
};

export default Sidebar;
