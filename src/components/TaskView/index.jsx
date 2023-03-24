import React, { useEffect } from "react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TaskViewHeader from "../TaskViewHeader";
import TaskItem from "../TaskItem";
import AddTask from "../AddTask";
import { getTasks } from "../../features/task/taskSlice";

const TaskView = () => {
    const allTasks = useSelector((state) => state.task.tasks);

    const dispatch = useDispatch();

    const { list } = useParams();

    let tasks = allTasks.filter((task) => task.lists.includes(list));

    if (!list) {
        tasks = allTasks;
    }

    useEffect(() => {
        const tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));

        dispatch(getTasks(tasksFromStorage));
    }, []);

    return (
        <div className="task-view">
            <TaskViewHeader />

            <ul className="task-view-tasks">
                {tasks.map((task) => (
                    <TaskItem key={task.id} {...task} />
                ))}
            </ul>

            <AddTask />
        </div>
    );
};

export default TaskView;
