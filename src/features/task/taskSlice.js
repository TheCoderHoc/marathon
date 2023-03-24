import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
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
    },
});

export default taskSlice.reducer;
export const { addTask, toggleCompletion } = taskSlice.actions;
