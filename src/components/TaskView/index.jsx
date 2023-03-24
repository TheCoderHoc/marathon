import React from "react";
import "./styles.css";
import TaskViewHeader from "../TaskViewHeader";

const TaskView = () => {
    return (
        <div className="task-view">
            <TaskViewHeader />

            <h2>Add Task Component</h2>
        </div>
    );
};

export default TaskView;
