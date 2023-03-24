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
    reducers: {
        getLists: (state, action) => {
            const listsFromStorage = action.payload;

            state.lists = listsFromStorage;
        },
        addList: (state, action) => {
            const newList = action.payload;

            state.lists.push(newList);
        },
        deleteList: (state, action) => {
            const id = action.payload;

            state.lists = state.lists.filter((list) => list.id !== id);
        },
        renameList: (state, action) => {
            const { id, newPath, updatedName } = action.payload;

            state.lists.map((list) => {
                if (list.id === id) {
                    list.name = updatedName;
                    list.path = newPath;
                }

                return list;
            });
        },
    },
});

export default listSlice.reducer;
export const { getLists, addList, deleteList, renameList } = listSlice.actions;
