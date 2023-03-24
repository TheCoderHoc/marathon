import React, { useState } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import {
    AiFillCheckCircle,
    AiOutlineCheckCircle,
    AiOutlineStar,
} from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import audioSound from "../../assets/sounds/task-complete.mp3";
import { toggleCompletion as toggleCompletionStore } from "../../features/task/taskSlice";

const TaskItem = ({ id, name }) => {
    const [isTaskCompleted, setTaskCompleted] = useState(false);
    const [isTaskIconHover, setTaskIconHover] = useState(false);

    const dispatch = useDispatch();

    const toggleCompletion = () => {
        // play completion sound
        if (!isTaskCompleted) {
            const audio = new Audio(audioSound);
            audio.play();
            audio.playbackRate = 5;
        }

        setTaskCompleted(!isTaskCompleted);

        dispatch(toggleCompletionStore(id));
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
