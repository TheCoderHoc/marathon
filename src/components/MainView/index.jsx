import React from "react";
import "./styles.css";
import Sidebar from "../Sidebar";
import TaskView from "../TaskView";

const MainView = () => {
    return (
        <div className="main-view">
            <Sidebar />

            <TaskView />
        </div>
    );
};

export default MainView;
