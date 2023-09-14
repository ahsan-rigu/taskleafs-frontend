import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../Contexts/DataContext";
import "./Workplace.css";
import Header from "../../Components/Header/Header";
import Sidebar from "./Components/Sidebar";
import { ClipLoader } from "react-spinners";
import BranchContainer from "./Components/BranchContainer";
import { Workplace as WorkplaceSchema } from "../../Schemas/DataSchema";
import WorkplaceOverview from "./Components/WorkplaceOverview";

const Workplace = () => {
  const { workplaceId } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useContext(DataContext);
  const [currentTab, setCurrentTab] = useState("overview");

  const workplace: WorkplaceSchema = data.workplaces?.find(
    ({ _id }) => _id === workplaceId
  );

  if (!workplace) {
    navigate("/dashboard");
    return <div></div>;
  }

  const branch = workplace?.branches?.find(({ _id }) => _id === currentTab);

  return loading ? (
    <div className="loader-container">
      <ClipLoader loading={loading} size={50} color="#FFFFF" />
    </div>
  ) : (
    <div>
      <Header />
      <div className="workplace-page">
        <Sidebar
          workplace={workplace}
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
        />
        {currentTab === "overview" ? (
          <WorkplaceOverview workplace={workplace} />
        ) : (
          <BranchContainer
            branch={branch!}
            setCurrentTab={setCurrentTab}
            workplaceName={workplace.name}
          />
        )}
      </div>
    </div>
  );
};

export default Workplace;
