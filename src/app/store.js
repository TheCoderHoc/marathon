import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import listReducer from "../features/list/listSlice";
import taskReducer from "../features/task/taskSlice";
import logger from "redux-logger";
import { addList, deleteList, renameList } from "../features/list/listSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: addList,
    effect: (action, listenerApi) => {
        const updatedLists = listenerApi.getState().list.lists;

        localStorage.setItem("lists", JSON.stringify(updatedLists));
    },
});

listenerMiddleware.startListening({
    actionCreator: deleteList,
    effect: (action, listenerApi) => {
        const updatedLists = listenerApi.getState().list.lists;

        localStorage.setItem("lists", JSON.stringify(updatedLists));
    },
});

listenerMiddleware.startListening({
    actionCreator: deleteList,
    effect: (action, listenerApi) => {
        const updatedLists = listenerApi.getState().list.lists;

        localStorage.setItem("lists", JSON.stringify(updatedLists));
    },
});

listenerMiddleware.startListening({
    actionCreator: renameList,
    effect: (action, listenerApi) => {
        const updatedLists = listenerApi.getState().list.lists;

        localStorage.setItem("lists", JSON.stringify(updatedLists));
    },
});

const store = configureStore({
    reducer: {
        list: listReducer,
        task: taskReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(listenerMiddleware.middleware)
            .concat(logger),
});

export default store;
