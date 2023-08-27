import React from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../Contexts/DataContext";
import "./Workplace.css";
import Header from "../../Components/Header/Header";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Sidebar from "./Components/Sidebar";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import LeafCard from "./Components/LeafCard";
import BranchContainer from "./Components/BranchContainer";

const Workplace = () => {
  const { workplaceid } = useParams();

  const { data, dispatch, loading } = React.useContext(DataContext);

  const [currentTab, setCurrentTab] = React.useState("overview");

  const workplace = data?.workplaces?.find(
    (workplace: any) => workplace._id === workplaceid
  );

  const branch = workplace?.branches?.find(
    (branch: any) => branch._id === currentTab
  );

  return loading ? (
    <div className="loader-container">
      <ClipLoader loading={loading} size={50} color="#FFFFF" />
    </div>
  ) : (
    <div>
      <Header />

      <div className="workplace-page">
        <Sidebar workplace={workplace} setCurrentTab={setCurrentTab} />
        {currentTab === "overview" ? (
          <section className="workplace-overview"></section>
        ) : (
          <BranchContainer branch={branch} />
        )}
      </div>
    </div>
  );
};

export default Workplace;
