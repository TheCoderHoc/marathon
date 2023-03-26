import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        getTasks: (state, action) => {
            const tasksFromStorage = action.payload;

            state.tasks = tasksFromStorage;
        },

        addTask: (state, action) => {
            const newTask = action.payload;

            state.tasks.push(newTask);
        },

        toggleCompletion: (state, action) => {
            const id = action.payload;

            state.tasks.map((task) => {
                if (task.id === id) {
                    task.completed = !task.completed;
                }

                return task;
            });
        },

        deleteTask: (state, action) => {
            const id = action.payload;

            state.tasks = state.tasks.filter((task) => task.id !== id);
        },
    },
});

export default taskSlice.reducer;
export const { getTasks, addTask, toggleCompletion, deleteTask } =
    taskSlice.actions;
