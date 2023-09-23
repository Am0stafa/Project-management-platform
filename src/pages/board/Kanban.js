import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Kanban.css';

function Kanban() {
  const initialColumns = {
    "column-1": { id: "column-1", title: "Task Ready", tasks: ["task-1"] },
    "column-2": { id: "column-2", title: "In Progress", tasks: ["task-2"] },
    "column-3": { id: "column-3", title: "Needs Review", tasks: ["task-3"] },
    "column-4": { id: "column-4", title: "Done", tasks: ["task-4"] },
  }

  const initialTasks = {
    "task-1": { id: "task-1", content: "Konsep hero title yang menarik" },
    "task-2": { id: "task-2", content: "Replace lorem ipsum text in the final designs" },
    "task-3": { id: "task-3", content: "Check the company we copied doesn't think we copied them." },
    "task-4": { id: "task-4", content: "Send Advert illustrations over to production company." },
  }

  const [columns, setColumns] = React.useState(initialColumns);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceColumn = columns[result.source.droppableId];
    const destColumn = columns[result.destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks];

    const [removed] = sourceTasks.splice(result.source.index, 1);
    destTasks.splice(result.destination.index, 0, removed);

    setColumns({
      ...columns,
      [sourceColumn.id]: { ...sourceColumn, tasks: sourceTasks },
      [destColumn.id]: { ...destColumn, tasks: destTasks }
    });
  }

  return (
    <div className="app">
      <main className="project">
        <div className="project-info">
          <h1>Kanban Board</h1>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="project-tasks">
            {Object.entries(columns).map(([columnId, column]) => (
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="project-column">
                    <div className="project-column-heading">
                      <h2 className="project-column-heading__title">{column.title}</h2>
                      <button className="project-column-heading__options"><i className="fas fa-ellipsis-h"></i></button>
                    </div>
                    {column.tasks.map((taskId, index) => (
                      <Draggable draggableId={taskId} index={index} key={taskId}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task">
                            <div className="task__tags">
                              <span className="task__tag task__tag--copyright">Copywriting</span>
                              <button className="task__options"><i className="fas fa-ellipsis-h"></i></button>
                            </div>
                            <p>{initialTasks[taskId].content}</p>
                            <div className="task__stats">
                              <span><time datetime="2021-11-24T20:00:00"><i className="fas fa-flag"></i>Nov 24</time></span>
                              <span><i className="fas fa-comment"></i>3</span>
                              <span><i className="fas fa-paperclip"></i>7</span>
                              <span className="task__owner"></span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  );
}

export default Kanban;
