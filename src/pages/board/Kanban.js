import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Kanban.css';
import { useCollection } from '../../hooks/useCollection';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom';

function Kanban() {
  const { documents: projects } = useCollection('projects');
  const { documents: users } = useCollection('users');

  const [columns, setColumns] = useState({
    "Task Ready": { id: "Task Ready", title: "Task Ready", tasks: [] },
    "In Progress": { id: "In Progress", title: "In Progress", tasks: [] },
    "Needs Review": { id: "Needs Review", title: "Needs Review", tasks: [] },
    "Done": { id: "Done", title: "Done", tasks: [] }
  });

  useEffect(() => {
    if (projects) {
      const formattedColumns = projects.reduce((acc, project) => {
        acc[project.type]?.tasks.push(project);
        return acc;
      }, {...columns});

      setColumns(formattedColumns);
    }
  }, [projects]);

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
  };

  const formatDate = (firebaseDate) => {
    const date = new Date(firebaseDate.seconds * 1000);
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'development': return '#4CAF50';  // Green
      case 'bug': return '#FFC107';          // Yellow
      case 'security issue': return '#F44336';  // Red
      case 'business issue': return '#2196F3';  // Blue
      default: return '#9E9E9E';              // Grey for unknown categories
    }
  }

  const getUserImages = (assignedUsersList) => {
    if (!users) return [];
    return users.filter(user => assignedUsersList.includes(user.id));
  };
  

  if (!projects) {
    return <div className="loading">Loading...</div>;
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
                    {column.tasks.map((project, index) => {
                      const filteredUsers = getUserImages(project.assignedUsersList);
                      return (
                        <Link to={`/projects/${project.id}`} key={project?.id ?? Math.random()} style={{ textDecoration: 'none' }}>
                        <Draggable draggableId={project.id} index={index} key={project.id}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task">
                              <div className="task__tags">
                                <span className="task__tag" style={{ backgroundColor: getCategoryColor(project.category) }}>{project.category}</span>
                                <button className="task__options"><i className="fas fa-ellipsis-h"></i></button>
                              </div>
                              <p>{project.name}</p>
                              <div className="task__stats">
                                <span>
                                  <time dateTime={formatDate(project.createdAt)}>
                                    <i className="fas fa-flag"></i>
                                    {formatDate(project.createdAt)}
                                  </time>
                                </span>
                                <span className="task__owner">
                                  {filteredUsers.map(user => (
                                    <li key={user?.photoURL ?? Math.random()}>
                                    <Avatar src={user?.photoURL} />
                                  </li>
                                  ))}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                        </Link>
                      );
                    })}
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
