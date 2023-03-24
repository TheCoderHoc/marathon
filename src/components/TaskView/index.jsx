import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TaskViewHeader from "../TaskViewHeader";
import TaskItem from "../TaskItem";
import AddTask from "../AddTask";

const TaskView = () => {
    const allTasks = useSelector((state) => state.task.tasks);

    const { list } = useParams();

    let tasks = allTasks.filter((task) => task.lists.includes(list));

    if (!list) {
        tasks = allTasks;
    }

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
