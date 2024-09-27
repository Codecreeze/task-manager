import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
    id: string;
    name: string;
    dueDate: string;
    status: 'To Do' | 'In Progress' | 'Done';
}

const initialTasks: {
    todo: Task[];
    inProgress: Task[];
    done: Task[];
} = {
    todo: [
        { id: "1", name: "Task 1", dueDate: "2024-09-30", status: 'To Do' },
        { id: "2", name: "Task 2", dueDate: "2024-10-01", status: 'To Do' },
    ],
    inProgress: [
        { id: "3", name: "Task 3", dueDate: "2024-10-02", status: 'In Progress' },
        { id: "4", name: "Task 4", dueDate: "2024-10-03", status: 'In Progress' },
    ],
    done: [
        { id: "5", name: "Task 5", dueDate: "2024-10-04", status: 'Done' },
        { id: "6", name: "Task 6", dueDate: "2024-10-05", status: 'Done' },
    ],
};

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: [
        ...initialTasks.todo,
        ...initialTasks.inProgress,
        ...initialTasks.done,
    ],
};

type TaskStatus = 'To Do' | 'In Progress' | 'Done';

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<{ name: string; status: TaskStatus; dueDate: string }>) {
            const newTask: Task = {
                id: new Date().toISOString(),
                name: action.payload.name,
                status: action.payload.status,
                dueDate: action.payload.dueDate,
            };
            state.tasks.push(newTask);
        },
        updateTaskStatus(state, action: PayloadAction<{ id: string; status: TaskStatus }>) {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                task.status = action.payload.status;
            }
        },
        updateTask(state, action: PayloadAction<{ id: string; name: string; dueDate: string; status: TaskStatus }>) {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                task.name = action.payload.name;
                task.dueDate = action.payload.dueDate;
                task.status = action.payload.status;
            }
        },
    },
});

export const { addTask, updateTaskStatus, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
