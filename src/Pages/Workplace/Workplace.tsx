import React from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../Contexts/DataContext";
import "./Workplace.css";
import Header from "../../Components/Header/Header";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Sidebar from "./Components/Sidebar";
import axios from "axios";
import { ClipLoader } from "react-spinners";

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
      const task = startLeaf.tasks.find(
        (task: any) => task._id === draggableId
      );
      startLeaf.tasks.splice(source.index, 1);
      finishLeaf.tasks.splice(destination.index, 0, task);
      dispatch({ type: "UPDATE_TASK", payload: { workplaceid, branch } });
      moveTask(startLeaf, finishLeaf);
      return;
    }
  };

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
          <section className="branch-container f-ssm">
            <header>{branch.branchName}</header>
            <DragDropContext onDragEnd={handleDrop}>
              <Droppable
                droppableId="CONTAINER"
                type="leaf"
                direction="horizontal"
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="leafs-container"
                  >
                    {branch.leafs.map((leaf: any, index: number) => (
                      <Draggable
                        draggableId={leaf._id}
                        index={index}
                        key={leaf._id}
                      >
                        {(provided: any) => (
                          <div
                            className="leaf"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <span className="leaf-header">{leaf.leafName}</span>
                            <Droppable droppableId={leaf._id} type="task">
                              {(provided) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  className="tasks-container"
                                >
                                  {leaf.tasks.map(
                                    (content: any, index: number) => (
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
                                            <span className="task-meta">
                                              <span>
                                                createdBy:{content.createdBy}
                                              </span>
                                              <select
                                                title="priority"
                                                name="priority"
                                                value={content.priority}
                                              >
                                                <option value="high">
                                                  High
                                                </option>
                                                <option value="normal">
                                                  Normal
                                                </option>
                                                <option value="low">Low</option>
                                              </select>
                                            </span>
                                          </div>
                                        )}
                                      </Draggable>
                                    )
                                  )}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </section>
        )}
      </div>
    </div>
  );
};

export default Workplace;
