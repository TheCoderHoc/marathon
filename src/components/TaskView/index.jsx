import React, { useEffect } from "react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTasks } from "../../features/task/taskSlice";
import TaskViewHeader from "../TaskViewHeader";
import TaskItem from "../TaskItem";
import AddTask from "../AddTask";
import { Empty } from "antd";
import emptyImage from "../../assets/images/emptyTwo.svg";

const TaskView = () => {
    const dispatch = useDispatch();

    // GRAB ALL THE TASKS FROM THE REDUX STORE
    const allTasks = useSelector((state) => state.task.tasks);

    // GRAB THE CURRENT LIST THAT WAS NAVIGATED IN THE URL
    const { list } = useParams();

    // FILTER THE TASKS BASED ON THE CURRENT LIST
    let tasks = allTasks?.filter((task) => task.lists.includes(list));

    if (!list) {
        tasks = [...allTasks];
    }

    // SORT THE TASKS BY ORDER OF IMPORTANCE
    const compareByImportance = (a, b) => {
        if (a.important < b.important) return -1;

        if (a.important > b.important) return 1;

        return 0;
    };

    tasks.sort(compareByImportance).reverse();

    // GRAB THE TASKS FROM THE LOCAL STORAGE ON LOAD IF THEY EXIST
    useEffect(() => {
        let tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));

        if (tasksFromStorage) {
            dispatch(getTasks(tasksFromStorage));
        }
    }, []);

    return (
        <div className="task-view">
            <TaskViewHeader />

            {/* RENDER THIS IF THERE ARE NO TASKS IN THE FILTERED TASKS ARRAY */}
            {tasks.length === 0 && (
                <Empty
                    image={emptyImage}
                    description={
                        <p className="task-view-empty">No tasks found...</p>
                    }
                />
            )}

            {/* RENDER THIS IF THERE ARE TASKS IN THE FILTERED TASKS ARRAY */}
            {tasks.length > 0 && (
                <ul className="task-view-tasks">
                    {tasks?.map((task) => (
                        <TaskItem key={task.id} {...task} />
                    ))}
                </ul>
            )}

            <AddTask />
        </div>
    );
};

export default TaskView;
