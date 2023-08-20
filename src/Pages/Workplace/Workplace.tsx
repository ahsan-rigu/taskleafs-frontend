import React from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../Contexts/DataContext";

const Workplace = () => {
  const { workplaceid } = useParams();

  const { data, dispatch } = React.useContext(DataContext);

  const workplace = data.workplaces.find(
    (workplace: any) => workplace._id === workplaceid
  );

  console.log(workplace);

  return (
    <div>
      <h1>{workplace.name}</h1>
      <h2>{workplace.description}</h2>
      {workplace?.members.map((user: any) => (
        <div key={user._id}>{user}</div>
      ))}
      {workplace.branches.map((branch: any) => (
        <div key={branch._id}>{branch.name}</div>
      ))}
    </div>
  );
};

export default Workplace;
