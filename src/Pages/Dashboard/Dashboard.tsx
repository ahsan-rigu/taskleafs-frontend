import React from "react";
import Header from "../../Components/Header/Header";
import "./Dashboard.css";
import { DataContext } from "../../Contexts/DataContext";
import { Link } from "react-router-dom";
import { type } from "os";

const Dashboard: React.FC = () => {
  const {
    data: { workplaces },
  } = React.useContext(DataContext);

  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="workplaces">
          <h2 className="workplaces-heading f-ll">Your Workplaces</h2>
          <div className="workplace-list">
            {workplaces?.map((workplace: any) => (
              <Link to="/" className="workplace-link f-ssm" key={workplace._id}>
                <div className="workplace-name">{workplace.name}</div>
              </Link>
            ))}
            <div className="workplace-link f-ssm" key={"reached-end"}>
              <div className="workplace-name">
                You have reached the end, but you can always create more
              </div>
            </div>
          </div>
        </div>
        <div className="create-workplace"></div>
      </div>
    </>
  );
};

export default Dashboard;
