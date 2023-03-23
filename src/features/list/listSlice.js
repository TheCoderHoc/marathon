import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lists: [
        {
            id: 0,
            path: "/tasks/my-day",
            name: "My Day",
            type: "default",
            count: 0,
            tasks: [],
        },
        {
            id: 1,
            path: "/tasks/tomorrow",
            name: "Tomorrow",
            type: "default",
            count: 0,
            tasks: [],
        },
        {
            id: 2,
            path: "/tasks",
            name: "Tasks",
            type: "default",
            count: 0,
            tasks: [],
        },
    ],
};

const listSlice = createSlice({
    name: "list",
    initialState,
});

export default listSlice.reducer;
