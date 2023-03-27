import React, { useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ControlledMenu, MenuItem, SubMenu } from "@szhsin/react-menu";
import { Divider } from "antd";
import {
    AiFillCheckCircle,
    AiOutlineCalendar,
    AiOutlineCheckCircle,
    AiOutlineStar,
    AiFillStar,
    AiOutlineHome,
} from "react-icons/ai";
import { BsCalendarDate, BsTrash } from "react-icons/bs";
import { BsCircle } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
import { FiMove, FiSun } from "react-icons/fi";
import { TbSunOff, TbStarOff } from "react-icons/tb";
import audioSound from "../../assets/sounds/task-complete.mp3";
import {
    toggleCompletion as toggleCompletionStore,
    toggleMyDay,
    toggleImportance,
    deleteTask,
} from "../../features/task/taskSlice";

const TaskItem = ({ id, name, lists, completed, important }) => {
    const [isTaskCompleted, setTaskCompleted] = useState(completed);
    const [isTaskImportant, setTaskImportant] = useState(important);
    const [isTaskIconHover, setTaskIconHover] = useState(false);
    const [isContextMenuOpen, setContextMenuOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    const allLists = useSelector((state) => state.list.lists);

    const params = useParams();

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

    const handleContextMenu = (e) => {
        e.preventDefault();

        setContextMenuOpen(true);

        setAnchorPoint({ x: e.clientX, y: e.clientY });
    };

    const handleToggleMyDay = () => {
        dispatch(toggleMyDay(id));
    };

    const handleToggleImportance = () => {
        setTaskImportant(!isTaskImportant);

        dispatch(toggleImportance(id));
    };

    const handleDelete = () => {
        dispatch(deleteTask(id));
    };

    const handleMoveTask = (taskId, list) => {
        // load the task with the specified id,
        // change
    };

    const generateMoveToLists = (taskId) => {
        let iterableLists = allLists.filter((list) => {
            if (
                list.name !== "My Day" &&
                list.name !== "Important" &&
                list.name !== "Tasks"
            ) {
                return list;
            }
        });

        if (!params.list) {
            iterableLists = iterableLists.filter(
                (list) => list.name !== "Tasks"
            );
        }

        iterableLists = iterableLists.filter((list) => {
            if (!list.path.includes(params.list)) {
                return list;
            }
        });

        return iterableLists.map((list) => {
            const { id, name, path, lists } = list;

            let listIcon = <FaTasks size={17} color="#357ec7" />;
            if (path === "/tasks/my-day") {
                listIcon = <FiSun size={17} color="#357ec7" />;
            }
            if (path === "/tasks/tomorrow") {
                listIcon = <BsCalendarDate size={17} color="#357ec7" />;
            }
            if (path === "/tasks/important") {
                listIcon = <AiOutlineStar size={17} color="#357ec7" />;
            }
            if (path === "/tasks") {
                listIcon = <AiOutlineHome size={17} color="#357ec7" />;
            }

            return (
                <MenuItem key={id} onClick={() => handleMoveTask(taskId, list)}>
                    {listIcon}
                    {name}
                </MenuItem>
            );
        });
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
        <li className="task-item" onContextMenu={handleContextMenu}>
            <div className="task-item-icon">{taskIcon}</div>
            <h3
                className={`task-item-name ${
                    isTaskCompleted && "task-item-name-completed"
                }`}
            >
                {name}
            </h3>

            <div
                className="task-item-star-icon"
                onClick={handleToggleImportance}
            >
                {isTaskImportant ? (
                    <AiFillStar size={20} color="#357ec7" />
                ) : (
                    <AiOutlineStar size={20} />
                )}
            </div>

            <ControlledMenu
                state={isContextMenuOpen ? "open" : "closed"}
                anchorPoint={anchorPoint}
                direction="bottom"
                onClose={() => setContextMenuOpen(false)}
            >
                {lists.includes("my-day") ? (
                    <MenuItem onClick={handleToggleMyDay}>
                        <TbSunOff size={20} /> Remove from My Day
                    </MenuItem>
                ) : (
                    <MenuItem onClick={handleToggleMyDay}>
                        <FiSun size={20} /> Add to My Day
                    </MenuItem>
                )}
                {lists.includes("important") ? (
                    <MenuItem onClick={handleToggleImportance}>
                        <TbStarOff size={20} /> Remove importance
                    </MenuItem>
                ) : (
                    <MenuItem onClick={handleToggleImportance}>
                        <AiOutlineStar size={20} /> Mark as important
                    </MenuItem>
                )}

                {isTaskCompleted ? (
                    <MenuItem onClick={toggleCompletion}>
                        <BsCircle size={20} /> Mark as not completed
                    </MenuItem>
                ) : (
                    <MenuItem onClick={toggleCompletion}>
                        <AiOutlineCheckCircle size={20} /> Mark as completed
                    </MenuItem>
                )}

                <Divider style={{ margin: "0.5rem" }} />

                <MenuItem>
                    <AiOutlineCalendar size={20} /> Due today
                </MenuItem>

                <MenuItem>
                    <BsCalendarDate size={20} /> Due tomorrow
                </MenuItem>
                <MenuItem>
                    <CiCalendarDate size={20} /> Pick a date
                </MenuItem>

                <Divider style={{ margin: "0.5rem" }} />

                <SubMenu
                    label={
                        <>
                            <FiMove size={20} />
                            Move task to...
                        </>
                    }
                >
                    {generateMoveToLists(id)}
                </SubMenu>

                <Divider style={{ margin: "0.5rem" }} />

                <MenuItem style={{ color: "red" }} onClick={handleDelete}>
                    <BsTrash size={20} /> Delete task
                </MenuItem>
            </ControlledMenu>
        </li>
    );
};

export default TaskItem;

// when in Tasks, only show Tomorrow and custom lists
// when in Important, show only tomorrow and custom lists
// when in custom lists, show Tasks and other custom lists but not the current custom list
