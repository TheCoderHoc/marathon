import React, { useState } from "react";
import "./styles.css";
import {
    AiFillCheckCircle,
    AiOutlineCheckCircle,
    AiOutlineStar,
} from "react-icons/ai";
import {} from "react-icons/ai";
import { BsCircle } from "react-icons/bs";

const TaskItem = ({ name }) => {
    const [isTaskCompleted, setTaskCompleted] = useState(false);
    const [isTaskIconHover, setTaskIconHover] = useState(false);

    const toggleCompletion = () => {
        setTaskCompleted(!isTaskCompleted);
    };

    let taskIcon = (
        <BsCircle
            size={20}
            onClick={toggleCompletion}
            onMouseOver={() => setTaskIconHover(true)}
        />
    );

    if (isTaskCompleted) {
        taskIcon = (
            <AiFillCheckCircle
                size={20}
                color="#357ec7"
                onClick={toggleCompletion}
            />
        );
    }

    if (isTaskIconHover) {
        taskIcon = (
            <AiOutlineCheckCircle
                size={20}
                onClick={toggleCompletion}
                onMouseLeave={() => setTaskIconHover(false)}
            />
        );
    }

    return (
        <li className="task-item">
            <div className="task-item-icon">{taskIcon}</div>
            <h3
                className={`task-item-name ${
                    isTaskCompleted && "task-item-name-completed"
                }`}
            >
                {name}
            </h3>

            <div className="task-item-star-icon">
                <AiOutlineStar size={20} />
            </div>
        </li>
    );
};

export default TaskItem;
