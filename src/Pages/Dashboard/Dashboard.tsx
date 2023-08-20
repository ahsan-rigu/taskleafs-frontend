import React from "react";
import Header from "../../Components/Header/Header";
import "./Dashboard.css";
import { DataContext } from "../../Contexts/DataContext";
import { Link } from "react-router-dom";
import { type } from "os";
import axios from "axios";
import { BsPlusLg } from "react-icons/bs";

const Dashboard: React.FC = () => {
  const {
    data: { workplaces },
    dispatch,
  } = React.useContext(DataContext);

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
      <Header />
      <div className="dashboard">
        <button className="create-workplace-button f-ssm">
          {<BsPlusLg size={"1.5rem"} />}
          <span>Create Workplace</span>
        </button>
        {workplaces?.map((workplace: any) => (
          <Link
            to={`/wp/${workplace._id}`}
            className="workplace-link f-ssm"
            key={workplace._id}
          >
            <div className="workplace-name">{workplace.name}</div>
          </Link>
        ))}
        <div className="workplace-link f-ssm" key={"reached-end"}>
          <div className="workplace-name">
            You have reached the end, but you can always create more
          </div>
        </div>
        {/* <div className="create-workplace">
          <form onSubmit={createWorkplace}>
            <input type="text" placeholder="Workplace Name" />
            <textarea placeholder="Workplace Description" />
            <button type="submit">Create Workplace</button>
          </form>
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
