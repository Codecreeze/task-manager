import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import { Task, updateTaskStatus, addTask, updateTask } from "../Redux/Slices/TaskSlice";
import TaskModal from "./TaskModal";

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const onDragStart = (event: React.DragEvent<HTMLLIElement>, task: Task) => {
    setDraggedTask(task);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (
    event: React.DragEvent<HTMLDivElement>,
    newStatus: Task["status"]
  ) => {
    event.preventDefault();
    if (draggedTask) {
      if (draggedTask.status !== newStatus) {
        dispatch(updateTaskStatus({ id: draggedTask.id, status: newStatus }));
      }
    }
    setDraggedTask(null);
  };

  const groupedTasks = tasks.reduce(
    (acc: { [key in Task["status"]]: Task[] }, task) => {
      acc[task.status] = acc[task.status] || [];
      acc[task.status].push(task);
      return acc;
    },
    { "To Do": [], "In Progress": [], Done: [] }
  );

  const handleAddOrUpdateTask = (data: Task) => {
    if (currentTask) {
      dispatch(
        updateTask({
          id: currentTask.id,
          status: data.status,
          name: data.name,
          dueDate: data.dueDate,
        })
      );
    } else {
      dispatch(addTask(data));
    }
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="grid place-items-center">
      <h3 className="text-3xl font-bold mb-6">Task Manager</h3>
      <div className="w-2/4 flex justify-end mb-4">
        <button
          onClick={() => {
            setCurrentTask(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white p-2 rounded"
        >
          + Add New Task
        </button>
      </div>
      <div className="flex justify-between bg-white shadow-lg rounded-lg border border-gray-200 w-full max-w-4xl mb-6 min-h-[500px] max-h-[500px] overflow-y-auto">
        <div
          className="w-1/3 p-5"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "To Do")}
        >
          <h4 className="text-xl font-semibold text-blue-500 mb-4 text-center">
            Todo
          </h4>
          <ul className="space-y-2">
            {groupedTasks["To Do"].map((task) => (
              <li
                key={task.id}
                className="bg-gray-100 p-3 rounded-lg shadow cursor-pointer"
                draggable
                onDragStart={(e) => onDragStart(e, task)}
                onClick={() => handleEditTask(task)}
              >
                {task.name}
                <span className="block text-gray-500 text-sm">
                  Due: {task.dueDate}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-l border-gray-200 mx-4"></div>
        <div
          className="w-1/3 p-5"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "In Progress")}
        >
          <h4 className="text-xl font-semibold text-yellow-500 mb-4 text-center">
            In Progress
          </h4>
          <ul className="space-y-2">
            {groupedTasks["In Progress"].map((task) => (
              <li
                key={task.id}
                className="bg-gray-100 p-3 rounded-lg shadow cursor-pointer"
                draggable
                onDragStart={(e) => onDragStart(e, task)}
                onClick={() => handleEditTask(task)}
              >
                {task.name}
                <span className="block text-gray-500 text-sm">
                  Due: {task.dueDate}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-l border-gray-200 mx-4"></div>
        <div
          className="w-1/3 p-5"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "Done")}
        >
          <h4 className="text-xl font-semibold text-green-500 mb-4 text-center">
            Done
          </h4>
          <ul className="space-y-2">
            {groupedTasks["Done"].map((task) => (
              <li
                key={task.id}
                className="bg-gray-100 p-3 rounded-lg shadow cursor-pointer"
                draggable
                onDragStart={(e) => onDragStart(e, task)}
                onClick={() => handleEditTask(task)}
              >
                {task.name}
                <span className="block text-gray-500 text-sm">
                  Due: {task.dueDate}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentTask(null);
          }}
          onSubmit={handleAddOrUpdateTask}
          task={currentTask}
        />
      )}
    </div>
  );
};

export default TaskList;
