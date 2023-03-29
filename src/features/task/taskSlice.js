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

        renameTask: (state, action) => {
            const { id, updatedTaskName } = action.payload;

            state.tasks.map((task) => {
                if (task.id === id) {
                    task.name = updatedTaskName;
                }

                return task;
            });
        },

        deleteTask: (state, action) => {
            const id = action.payload;

            state.tasks = state.tasks.filter((task) => task.id !== id);
        },

        addStep: (state, action) => {
            const { id, stepToAdd } = action.payload;

            state.tasks.map((task) => {
                if (task.id === id) {
                    task.steps.push(stepToAdd);
                }

                return task;
            });
        },

        toggleTaskStepCompletion: (state, action) => {
            const { taskId, taskStepId } = action.payload;

            state.tasks.map((task) => {
                if (task.id === taskId) {
                    task.steps.map((step) => {
                        if (step.id === taskStepId) {
                            step.completed = !step.completed;
                        }

                        return step;
                    });
                }

                return task;
            });
        },

        renameTaskStepName: (state, action) => {
            const { taskId, taskStepId, updatedTaskStepName } = action.payload;

            state.tasks.map((task) => {
                if (task.id === taskId) {
                    task.steps.map((step) => {
                        if (step.id === taskStepId) {
                            step.name = updatedTaskStepName;
                        }

                        return step;
                    });
                }

                return task;
            });
        },

        deleteTaskStep: (state, action) => {
            const { taskId, taskStepId } = action.payload;

            state.tasks.map((task) => {
                if (task.id === taskId) {
                    task.steps = task.steps.filter(
                        (step) => step.id !== taskStepId
                    );
                }

                return task;
            });
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
    renameTask,
    deleteTask,
    addStep,
    toggleTaskStepCompletion,
    renameTaskStepName,
    deleteTaskStep,
} = taskSlice.actions;
