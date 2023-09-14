import React, { useContext, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Leaf } from "../../../Schemas/DataSchema";
import { BsPencil, BsTrash } from "react-icons/bs";
import { DataContext } from "../../../Contexts/DataContext";
import { useParams } from "react-router-dom";
import mongoose from "mongoose";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Props {
  leaf: Leaf;
  index: number;
  branchId: string;
}

const LeafCard = ({
  leaf: { _id, leafName, tasks },
  index,
  branchId,
}: Props) => {
  const { workplaceId } = useParams();
  const { dispatch, data } = useContext(DataContext);
  const [editLeafName, setEditLeafName] = useState(false);

  const editName = async (e: any) => {
    e.preventDefault();
    const dispatchObj = {
      type: "EDIT_LEAF_NAME",
      payload: {
        leafName: e.target[0].value,
        leafId: _id,
        branchId,
        workplaceId,
      },
    };
    dispatch(dispatchObj);
    setEditLeafName(!editLeafName);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/leaf/`,
        { _id, leafName, dispatchObj, workplaceId },
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

  const deleteLeaf = async () => {
    dispatch({
      type: "DELETE_LEAF",
      payload: {
        leafId: _id,
        branchId,
        workplaceId,
      },
    });
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/leaf/${workplaceId}/${branchId}/${_id}`,
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

  const delteTask = async (e: any, taskId: string) => {
    dispatch({
      type: "DELETE_TASK",
      payload: {
        leafId: _id,
        branchId,
        workplaceId,
        taskId,
      },
    });
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/leaf/task/${workplaceId}/${branchId}/${_id}/${taskId}`,
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

  const handlePriorityChange = async (e: any, taskId: any) => {
    const task = tasks.find((task) => task._id === taskId);
    const dispatchObj = {
      type: "EDIT_TASK_PRIORITY",
      payload: {
        leafId: _id,
        branchId,
        workplaceId,
        taskId,
        priority: e.target.value,
      },
    };
    dispatch(dispatchObj);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/leaf/task`,
        {
          task: { ...task, priority: e.target.value },
          leafId: _id,
          branchId,
          workplaceId,
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

  const addTask = async (e: any) => {
    e.preventDefault();
    const task = {
      _id: new mongoose.Types.ObjectId(),
      task: e.target[0].value,
      priority: e.target[1].value,
      createdBy: data.name,
    };
    dispatch({
      type: "ADD_TASK",
      payload: {
        leafId: _id,
        branchId,
        workplaceId,
        task,
      },
    });
    e.target[0].value = "";
    e.target[1].value = "normal";
    e.target[0].blur();
    e.target[1].blur();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/leaf/task`,
        { leafId: _id, branchId, workplaceId, task },
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
    <Draggable draggableId={_id} index={index}>
      {(provided) => (
        <div
          className="leaf"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <span className="leaf-header">
            {editLeafName ? (
              <form className="edit-leaf-name" onSubmit={editName}>
                <input
                  type="text"
                  defaultValue={leafName}
                  placeholder="leaf name"
                  autoFocus
                  minLength={8}
                  maxLength={16}
                />
              </form>
            ) : (
              <span> {leafName}</span>
            )}
            <span>
              <button className="p0" title="Delete" onClick={deleteLeaf}>
                <BsTrash size={"1rem"} />
              </button>
              <button
                className="p0"
                title="Edit"
                onClick={() => setEditLeafName(!editLeafName)}
              >
                <BsPencil size={"1rem"} />
              </button>
            </span>
          </span>
          <Droppable droppableId={_id} type="task">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="tasks-container"
              >
                {tasks.map((content: any, index: number) => (
                  <Draggable
                    draggableId={content._id}
                    index={index}
                    key={content._id}
                  >
                    {(provided: any) => (
                      <div
                        className="task"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {content.task}
                        <div className="task-meta">
                          <span className="task-id">
                            by: {content.createdBy}
                          </span>
                          <select
                            title="priority"
                            name="priority"
                            value={content.priority}
                            onChange={(e) =>
                              handlePriorityChange(e, content._id)
                            }
                            className={content.priority}
                          >
                            <option value="high">High</option>
                            <option value="normal">Normal</option>
                            <option value="low">Low</option>
                          </select>
                        </div>
                        <button
                          title="delete"
                          onClick={(e) => delteTask(e, content._id)}
                          className="tr"
                        >
                          <BsTrash size={".75rem"} />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <form onSubmit={addTask} className="add-task-form">
                  <input type="text" placeholder="Add Task" required />
                  <select
                    title="priority"
                    name="priority"
                    defaultValue={"normal"}
                  >
                    <option value="high">High</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                  </select>
                </form>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default LeafCard;
