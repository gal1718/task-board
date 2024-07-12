import React, { useState } from "react";
import { Task as TaskType } from "../../utils/types";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import './Task.css'

function Task({ task, id, handleDrop}: { task: TaskType, id: string, handleDrop: (taskId: string) => void}) {
  // const { dragOver, setDragOver, onDragOver, onDragLeave } = useDragAndDrop();
  useDragAndDrop(id, handleDrop);

  return (
    <div className="Task" id={id} >
      <h3 className="task-title">{task.title}</h3>
      <p className="task-storypoints">Story Points: {task.storyPoints}</p>
      <p className="task-description">{task.description}</p>
    </div>
  );
}

export default Task;
