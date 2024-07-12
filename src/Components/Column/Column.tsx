import React, { useState } from "react";
import { Task as TaskType } from "../../utils/types";
import './Column.css'
import Task from "../Task/Task";

function Column({ title, tasks, handleDrop }: { title: string; tasks: TaskType[], handleDrop: (taskId: string) => void }) {
  // const { dragOver, setDragOver, onDragOver, onDragLeave } = useDragAndDrop();

  return (
    <div className="Column">
        <div className="column-header">{title}</div>
      <div className="tasks">
        {tasks.map(task => (
          <Task id={task.id} key={task.id} task={task} handleDrop={handleDrop} ></Task>
        ))}
      </div>
     
    </div>
  );
}

export default Column;
