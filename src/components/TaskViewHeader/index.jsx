import React from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { AiOutlineSetting } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

const TaskViewHeader = () => {
    const { list } = useParams();

    const listName = list ? list.replaceAll("-", " ").toLowerCase() : "Tasks";

    const currentDate = format(new Date(), "eeee, MMMM d");

    return (
        <header className="task-view-header">
            <div className="task-view-header-left">
                <h3 className="task-view-header-title">{listName}</h3>
                <div className="task-view-header-date">{currentDate}</div>
            </div>
            <div className="task-view-header-right">
                <AiOutlineSetting size={20} />
                <BsThreeDots size={20} />
            </div>
        </header>
    );
};

export default TaskViewHeader;

