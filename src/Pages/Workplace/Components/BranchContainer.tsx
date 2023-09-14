import React, { useContext, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { DataContext } from "../../../Contexts/DataContext";
import { Branch } from "../../../Schemas/DataSchema";
import axios from "axios";
import { useParams } from "react-router-dom";
import LeafCard from "./LeafCard";
import { BsPencil, BsTrash } from "react-icons/bs";
import mongoose from "mongoose";
import { toast } from "react-hot-toast";

interface Props {
  branch: Branch;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  workplaceName: string;
}

const BranchContainer = ({ branch, setCurrentTab, workplaceName }: Props) => {
  const { workplaceId } = useParams();
  const { dispatch } = useContext(DataContext);
  const [editBranchName, setEditBranchName] = useState(false);

  if (!branch) {
    setCurrentTab("overview");
    return <></>;
  }

  const addLeaf = async (event: any) => {
    event.preventDefault();
    const leaf = {
      _id: new mongoose.Types.ObjectId(),
      leafName: event.target[0].value,
      tasks: [],
    };
    dispatch({
      type: "ADD_LEAF",
      payload: {
        leaf: { ...leaf, _id: leaf._id.toString() },
        branchId: branch._id,
        workplaceId,
      },
    });
    event.target[0].value = "";
    event.target[0].blur();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/leaf`,
        { leaf, branchId: branch._id, workplaceId },
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

  const handleDrop = async ({
    destination,
    source,
    draggableId,
    type,
  }: any) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (type === "leaf") {
      const leaf = branch.leafs.splice(source.index, 1);
      branch.leafs.splice(destination.index, 0, ...leaf);
      return;
    }
    if (type === "task") {
      const startLeaf = branch.leafs.find(
        (leaf) => leaf._id === source.droppableId
      );
      const finishLeaf = branch.leafs.find(
        (leaf) => leaf._id === destination.droppableId
      );
      const task = startLeaf!.tasks.find((task) => task._id === draggableId);
      startLeaf!.tasks.splice(source.index, 1);
      finishLeaf!.tasks.splice(destination.index, 0, task!);
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/leaf/task/move`,
          {
            workplaceId,
            branchId: branch._id,
            startLeafId: startLeaf!._id,
            finishLeafId: finishLeaf!._id,
            source: source.index,
            destination: destination.index,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        toast.error("Something went wrong");
      }
      return;
    }
  };

  const updateBranchName = async (event: any) => {
    event.preventDefault();
    try {
      dispatch({
        type: "UPDATE_BRANCH_NAME",
        payload: {
          branchName: event.target[0].value,
          branchId: branch._id,
          workplaceId,
        },
      });
      setEditBranchName(!editBranchName);
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/branch`,
        {
          branchName: event.target[0].value,
          branchId: branch._id,
          workplaceId,
          workplaceName,
        },
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

  const deleteBranch = async () => {
    setCurrentTab("overview");
    dispatch({
      type: "DELETE_BRANCH",
      payload: { branchId: branch._id, workplaceId },
    });
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/branch/${workplaceId}/${branch._id}`,
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
    <section className="branch-container f-ssm">
      <header>
        {editBranchName ? (
          <form onSubmit={updateBranchName} className="branch-title">
            <input
              type="text"
              defaultValue={branch.branchName}
              placeholder="branch name"
              autoFocus
              minLength={8}
              maxLength={24}
            />
          </form>
        ) : (
          <span className="branch-title"> {branch.branchName}</span>
        )}{" "}
        <span>
          <button onClick={deleteBranch} title="delte">
            <BsTrash size={"1rem"} />
          </button>
          <button
            onClick={() => setEditBranchName(!editBranchName)}
            title="edit"
          >
            <BsPencil size={"1rem"} />
          </button>
        </span>
      </header>
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="CONTAINER" type="leaf" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="leafs-container"
            >
              {branch.leafs.map((leaf: any, index: number) => (
                <LeafCard
                  leaf={leaf}
                  index={index}
                  key={leaf._id}
                  branchId={branch._id}
                />
              ))}
              {provided.placeholder}
              <div className="leaf">
                <span className="leaf-header">Add Leaf</span>
                <form onSubmit={addLeaf} className="add-leaf-form">
                  <input
                    type="text"
                    placeholder="add leaf"
                    minLength={8}
                    maxLength={16}
                  />
                  <button>+</button>
                </form>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default BranchContainer;
