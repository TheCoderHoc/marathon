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

        toggleMyDay: (state, action) => {
            const id = action.payload;

            state.tasks.map((task) => {
                if (task.id === id) {
                    if (task.lists.includes("my-day")) {
                        const index = task.lists.indexOf("my-day");

                        task.lists.splice(index, 1);
                    } else {
                        task.lists.push("my-day");
                    }
                }

                return task;
            });
        },

        toggleImportance: (state, action) => {
            const id = action.payload;

            state.tasks.map((task) => {
                if (task.id === id) {
                    if (task.lists.includes("important")) {
                        const index = task.lists.indexOf("important");

                        task.lists.splice(index, 1);
                        task.important = false;
                    } else {
                        task.lists.push("important");
                        task.important = true;
                    }
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
export const {
    getTasks,
    addTask,
    toggleCompletion,
    toggleMyDay,
    toggleImportance,
    deleteTask,
} = taskSlice.actions;
