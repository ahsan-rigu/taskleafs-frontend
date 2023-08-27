import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Leaf } from "../../../Schemas/DataSchema";

interface Props {
  leaf: Leaf;
  index: number;
}

const LeafCard = ({ leaf: { _id, leafName, tasks }, index }: Props) => {
  return (
    <Draggable draggableId={_id} index={index}>
      {(provided) => (
        <div
          className="leaf"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <span className="leaf-header">{leafName}</span>
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
                        <span className="task-meta">
                          <span>createdBy:{content.createdBy}</span>
                          <select
                            title="priority"
                            name="priority"
                            value={content.priority}
                          >
                            <option value="high">High</option>
                            <option value="normal">Normal</option>
                            <option value="low">Low</option>
                          </select>
                        </span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default LeafCard;
