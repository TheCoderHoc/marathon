import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import listReducer from "../features/list/listSlice";
import taskReducer from "../features/task/taskSlice";
import logger from "redux-logger";
import { addList, deleteList, renameList } from "../features/list/listSlice";
import {
    addTask,
    toggleCompletion,
    toggleMyDay,
    deleteTask,
} from "../features/task/taskSlice";

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

listenerMiddleware.startListening({
    actionCreator: addTask,
    effect: (action, listenerApi) => {
        const updatedTasks = listenerApi.getState().task.tasks;

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    },
});

listenerMiddleware.startListening({
    actionCreator: toggleCompletion,
    effect: (action, listenerApi) => {
        const updatedTasks = listenerApi.getState().task.tasks;

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    },
});

listenerMiddleware.startListening({
    actionCreator: deleteTask,
    effect: (action, listenerApi) => {
        const updatedTasks = listenerApi.getState().task.tasks;

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    },
});

listenerMiddleware.startListening({
    actionCreator: toggleMyDay,
    effect: (action, listenerApi) => {
        const updatedTasks = listenerApi.getState().task.tasks;

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
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
