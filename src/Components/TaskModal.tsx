import React from "react";
import { useForm } from "react-hook-form";

interface Task {
  id: string;
  name: string;
  status: string;
  dueDate: string;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  task?: any; 
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: task,
  });

  const onSubmitHandler = (data: Task) => {
    onSubmit(data);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h3 className="text-lg font-bold mb-4">
          {task ? "Update Task" : "Add New Task"}
        </h3>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Task Name
            </label>
            <input
              id="name"
              {...register("name", { required: "Task name is required" })}
              className="border p-2 w-full"
              placeholder="Enter task name"
            />
            {errors.name && (
              <p className="text-red-500">{(errors.name as any).message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block mb-2">
              Status
            </label>
            <select
              id="status"
              {...register("status", { required: "Status is required" })}
              className="border p-2 w-full"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {errors.status && (
              <p className="text-red-500">{(errors.status as any).message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block mb-2">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              {...register("dueDate", { required: "Due date is required" })}
              className="border p-2 w-full"
            />
            {errors.dueDate && (
              <p className="text-red-500">{(errors.dueDate as any).message}</p>
            )}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {task ? "Update Task" : "Add Task"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 p-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
