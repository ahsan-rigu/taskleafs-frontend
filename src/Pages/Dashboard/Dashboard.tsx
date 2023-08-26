import React, { useContext } from "react";
import Header from "../../Components/Header/Header";
import "./Dashboard.css";
import { DataContext } from "../../Contexts/DataContext";
import { Link } from "react-router-dom";
import CreateWorkplaceForm from "./Components/CreateWorkplaceForm";
import { GoLinkExternal } from "react-icons/go";
import { ClipLoader } from "react-spinners";
import { Workplace } from "../../Schemas/DataSchema";

const Dashboard = () => {
  const {
    data: { workplaces },
    loading,
  } = useContext(DataContext);

  return loading ? (
    <div className="loader-container">
      <ClipLoader loading={loading} size={50} color="#FFFFF" />
    </div>
  ) : (
    <>
      <Header />
      <div className="dashboard">
        <CreateWorkplaceForm />
        {workplaces?.map((workplace: Workplace) => (
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
