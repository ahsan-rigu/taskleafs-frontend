import React from "react";
import Header from "../../Components/Header/Header";
import "./Dashboard.css";
import { DataContext } from "../../Contexts/DataContext";
import { Link } from "react-router-dom";
import CreateWorkplaceForm from "./Components/CreateWorkplaceForm";
import { GoLinkExternal } from "react-icons/go";

const Dashboard: React.FC = () => {
  const {
    data: { workplaces },
  } = React.useContext(DataContext);

  return (
    <>
      <Header />
      <div className="dashboard">
        <CreateWorkplaceForm />
        {workplaces?.map((workplace: any) => (
          <Link
            to={`/wp/${workplace._id}`}
            className="workplace-link f-ssm"
            key={workplace._id}
          >
            <h3 className="workplace-name">{workplace.name}</h3>
            <p className="f-r workplace-desc">{workplace.description}</p>
            <em className="f-r">
              go to workplace <GoLinkExternal size={"1rem"} />
            </em>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
