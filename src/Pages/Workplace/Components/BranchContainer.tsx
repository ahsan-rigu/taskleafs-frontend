import React, { useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { DataContext } from "../../../Contexts/DataContext";
import { Branch } from "../../../Schemas/DataSchema";
import axios from "axios";
import { useParams } from "react-router-dom";
import LeafCard from "./LeafCard";

interface Props {
  branch: Branch;
}

const updateBranch = async (branch: any) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/api/branch`,
      { branch },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const moveTask = async (startLeaf: any, finishLeaf: any) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/api/leaf/task/move`,
      { startLeaf, finishLeaf },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const BranchContainer = ({ branch }: Props) => {
  const { workplaceid } = useParams();

  const { dispatch } = useContext(DataContext);

  const handleDrop = (idk: any) => {
    const { destination, source, draggableId, type } = idk;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (type === "leaf") {
      const leaf = branch.leafs.splice(source.index, 1);
      branch.leafs.splice(destination.index, 0, ...leaf);
      dispatch({ type: "MOVE_LEAF", payload: { workplaceid, branch } });
      updateBranch({
        ...branch,
        leads: branch.leafs.map((leaf: any) => {
          return leaf._id;
        }),
      });
      return;
    }
    if (type === "task") {
      const startLeaf = branch.leafs.find(
        (leaf: any) => leaf._id === source.droppableId
      );
      const finishLeaf = branch.leafs.find(
        (leaf: any) => leaf._id === destination.droppableId
      );
      const task = startLeaf!.tasks.find(
        (task: any) => task._id === draggableId
      );
      startLeaf!.tasks.splice(source.index, 1);
      finishLeaf!.tasks.splice(destination.index, 0, task!);
      dispatch({ type: "UPDATE_TASK", payload: { workplaceid, branch } });
      moveTask(startLeaf, finishLeaf);
      return;
    }
  };

  return (
    <section className="branch-container f-ssm">
      <header>{branch.branchName}</header>
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="CONTAINER" type="leaf" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="leafs-container"
            >
              {branch.leafs.map((leaf: any, index: number) => (
                <LeafCard leaf={leaf} index={index} key={leaf._id} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default BranchContainer;
