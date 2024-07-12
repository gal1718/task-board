import { useState } from "react";
import useDragAndDrop from "./hooks/useDragAndDrop";
import "./App.css";
import Column from "./Components/Column/Column";
import { Task as TaskType } from "./utils/types";


const initialTasks: TaskType[] = [
  {
    id: "111",
    title: "Task 1",
    description: "Description of Task 1",
    storyPoints: 5,
    state: "todo",
  },
  {
    id: "222",
    title: "Task 2",
    description: "Description of Task 2",
    storyPoints: 8,
    state: "todo",
  },
  {
    id: "333",
    title: "Task 3",
    description: "Description of Task 3",
    storyPoints: 3,
    state: "done",
  },
];

function App() {
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);


  const [newTask, setNewTask] = useState<TaskType>();
  // const { dragOver, setDragOver, onDragOver, onDragLeave } = useDragAndDrop();

 
  const updateTaskState = (taskId: string, newState: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, state: newState as 'todo' | 'inProgress' | 'onHold' | 'done' } : task
      )
    );
  };

  const determineNewState = (newColumnTitle: string): string | null => {
    switch (newColumnTitle) {
      case "To Do":
        return "todo";
        case "On Hold":
        return "onHold";
      case "In Progress":
        return "inProgress";
      case "Done":
        return "done";
      default:
        return null; // Handle other cases as needed
    }
  };

  const handleDrop = (taskId: string) => {
    const taskElement = document.getElementById(taskId);
    if (!taskElement) return;

    const columns = Array.from(document.querySelectorAll(".Column"));
    let newColumnTitle = null;

    for (const column of columns) {
      const columnRect = column.getBoundingClientRect();

      const taskRect = taskElement.getBoundingClientRect();
      const taskCenterX = taskRect.left + taskRect.width / 2;
      const taskCenterY = taskRect.top + taskRect.height / 2;

      if (
        taskCenterX >= columnRect.left &&
        taskCenterX <= columnRect.right &&
        taskCenterY >= columnRect.top &&
        taskCenterY <= columnRect.bottom
      ) {
        newColumnTitle = column.querySelector(".column-header")?.textContent;
        break;
      }
    }

    if (newColumnTitle) {
      const newState = determineNewState(newColumnTitle);
      if (newState) {
        updateTaskState(taskId, newState);
      }
    }
  };

  return (
    <div className="App">
      <div className="board">
        <Column
          title="To Do"
          tasks={tasks.filter((task) => (task.state == "todo"))}
          handleDrop= {handleDrop}
        ></Column>
        <Column
          title="In Progress"
          tasks={tasks.filter((task) => (task.state == "inProgress"))}
          handleDrop={handleDrop}
        ></Column>
        <Column
          title="On Hold"
          tasks={tasks.filter((task) => (task.state == "onHold"))}
          handleDrop={handleDrop}
        ></Column>
        <Column
          title="Done"
          tasks={tasks.filter((task) => (task.state == "done"))}
          handleDrop={handleDrop}
        ></Column>
      </div>
    </div>
  );
}

export default App;
