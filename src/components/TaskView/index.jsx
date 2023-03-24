import React from "react";
import "./styles.css";
import TaskViewHeader from "../TaskViewHeader";
import AddTask from "../AddTask";

const TaskView = () => {
    return (
        <div className="task-view">
            <TaskViewHeader />

            <AddTask />
        </div>
    );
};

export default TaskView;
