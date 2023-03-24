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
    },
});

export default taskSlice.reducer;
export const { addTask } = taskSlice.actions;
