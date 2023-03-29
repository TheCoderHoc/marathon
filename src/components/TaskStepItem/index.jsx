import React, { useState } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
    toggleTaskStepCompletion,
    renameTaskStepName as renameTaskStepInStore,
    addTask,
    deleteTaskStep,
} from "../../features/task/taskSlice";
import {
    AiFillCheckCircle,
    AiOutlineCheckCircle,
    AiOutlinePlus,
} from "react-icons/ai";
import { BsCircle, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { Menu, MenuItem, MenuButton, MenuDivider } from "@szhsin/react-menu";

const TaskStepItem = ({
    id,
    completed,
    name,
    onSelectStepId,
    active,
    taskId,
}) => {
    const [taskStepName, setTaskStepName] = useState(name);

    const [isStepIconHover, setStepIconHover] = useState(false);

    const isStepCompleted = completed;

    const dispatch = useDispatch();

    const params = useParams();

    const handleToggleCompletion = () => {
        dispatch(toggleTaskStepCompletion({ taskId, taskStepId: id }));
    };

    const handleSelectTaskStep = () => {};

    const handleDeleteTaskStep = () => {
        dispatch(deleteTaskStep({ taskId, taskStepId: id }));
    };

    const handleRenameTaskStep = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();

            renameTaskStep();
        }
    };

    const renameTaskStep = () => {
        dispatch(
            renameTaskStepInStore({
                taskId,
                taskStepId: id,
                updatedTaskStepName: taskStepName,
            })
        );
    };

    const handlePromoteToTask = () => {
        const newTask = {
            id,
            name,
            description: "",
            completed: completed,
            important: false,
            lists: params.list ? [params.list] : [],
            steps: [],
            createdAt: JSON.stringify(new Date()),
        };

        dispatch(addTask(newTask));

        dispatch(deleteTaskStep({ taskId, taskStepId: id }));
    };

    let taskStepIcon = isStepCompleted ? (
        <AiFillCheckCircle
            size={18}
            color="#357ec7"
            onClick={handleToggleCompletion}
        />
    ) : isStepIconHover ? (
        <AiOutlineCheckCircle
            size={18}
            onClick={handleToggleCompletion}
            onMouseLeave={() => setStepIconHover(false)}
        />
    ) : (
        <BsCircle size={18} onMouseOver={() => setStepIconHover(true)} />
    );

    return (
        <div
            className={`task-step-item ${active && "active"}`}
            onClick={() => onSelectStepId(id, name)}
        >
            {taskStepIcon}

            <input
                type="text"
                value={taskStepName}
                className={`task-step-item-name-input ${
                    isStepCompleted && "completed"
                }`}
                disabled={active ? false : true}
                onChange={(e) => setTaskStepName(e.target.value)}
                onKeyDown={handleRenameTaskStep}
                onBlur={renameTaskStep}
            />

            <Menu
                menuButton={
                    <MenuButton className="task-step-item-menu-icon">
                        <BsThreeDotsVertical size={16} />
                    </MenuButton>
                }
            >
                {isStepCompleted ? (
                    <MenuItem onClick={handleToggleCompletion}>
                        <BsCircle size={18} /> Mark as not completed
                    </MenuItem>
                ) : (
                    <MenuItem onClick={handleToggleCompletion}>
                        <AiOutlineCheckCircle size={18} /> Mark as completed
                    </MenuItem>
                )}

                {!isStepCompleted && (
                    <MenuItem onClick={handlePromoteToTask}>
                        <AiOutlinePlus size={18} /> Promote to task
                    </MenuItem>
                )}

                <MenuDivider />
                <MenuItem
                    onClick={handleDeleteTaskStep}
                    style={{ color: "red" }}
                >
                    <BsTrash size={18} /> Delete step
                </MenuItem>
            </Menu>
        </div>
    );
};

export default TaskStepItem;
