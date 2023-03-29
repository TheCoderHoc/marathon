import React, { useState } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import {
    renameTask as renameTaskInStore,
    addStep,
    toggleMyDay,
    addTaskDescription,
} from "../../features/task/taskSlice";
import { AiOutlinePlus } from "react-icons/ai";
import { BsAlarm, BsCircle, BsArrowRepeat } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { MdDateRange, MdOutlineAttachFile } from "react-icons/md";
import { TbSunOff } from "react-icons/tb";
import TaskStepItem from "../TaskStepItem";

const EditTask = ({
    id,
    currentName,
    lists,
    steps,
    description,
    taskIcon,
    importanceIcon,
    onToggleImportance,
}) => {
    const [editedTaskName, setEditedTaskName] = useState(currentName);
    const [taskStepName, setTaskStepName] = useState("");
    const [switchIcon, setSwitchIcon] = useState(false);
    const [taskDescription, setTaskDescription] = useState(description);

    const [selectedStepId, setSelectedStepId] = useState(0);

    const isTaskInMyDay = lists.includes("my-day");

    const dispatch = useDispatch();

    const handleRenameTask = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();

            renameTask();
        }
    };

    const renameTask = () => {
        dispatch(renameTaskInStore({ id, updatedTaskName: editedTaskName }));
    };

    const handleAddTaskStep = (e) => {
        e.preventDefault();

        const newTaskStep = {
            id: Date.now() * 10,
            name: taskStepName,
            completed: false,
            createdAt: JSON.stringify(new Date()),
        };

        dispatch(addStep({ id, stepToAdd: newTaskStep }));

        setTaskStepName("");
    };

    const handleSelectStepId = (id) => {
        if (selectedStepId !== id) {
            setSelectedStepId(id);
            return;
        }

        setSelectedStepId(null);
    };

    const handleMyDayToggle = () => {
        dispatch(toggleMyDay(id));
    };

    const handleTaskDescription = (e) => {
        e.preventDefault();

        dispatch(
            addTaskDescription({ taskId: id, description: taskDescription })
        );
    };

    return (
        <div className="edit-task">
            <div className="edit-task-top-content">
                <div className="edit-task-block">
                    <form
                        className="edit-task-info"
                        onSubmit={handleRenameTask}
                    >
                        <div className="edit-task-info-icon">{taskIcon}</div>
                        <input
                            type="text"
                            value={editedTaskName}
                            className="edit-task-name-input"
                            onChange={(e) => setEditedTaskName(e.target.value)}
                            onKeyDown={handleRenameTask}
                            onBlur={renameTask}
                        />
                        <div className="star-icon" onClick={onToggleImportance}>
                            {importanceIcon}
                        </div>
                    </form>

                    <ul>
                        {steps.map((step) => {
                            return (
                                <TaskStepItem
                                    key={step.id}
                                    {...step}
                                    taskId={id}
                                    active={selectedStepId === step.id}
                                    onSelectStepId={handleSelectStepId}
                                />
                            );
                        })}
                    </ul>
                    <form
                        className="edit-task-add-steps"
                        onSubmit={handleAddTaskStep}
                    >
                        {switchIcon ? (
                            <BsCircle
                                size={20}
                                className="edit-task-info-icon"
                            />
                        ) : (
                            <AiOutlinePlus
                                size={20}
                                color="#357ec7"
                                className="edit-task-info-icon"
                            />
                        )}

                        <input
                            type="text"
                            placeholder={
                                steps.length > 0 ? "Next Step" : "Add Step"
                            }
                            className="edit-task-add-steps-input"
                            value={taskStepName}
                            onChange={(e) => setTaskStepName(e.target.value)}
                            onFocus={() => setSwitchIcon(true)}
                            onBlur={() => setSwitchIcon(false)}
                        />
                    </form>
                </div>
                <div className="edit-task-block" onClick={handleMyDayToggle}>
                    {isTaskInMyDay ? (
                        <div
                            className="edit-task-toggle-my-day"
                            style={{ color: "#357ec7" }}
                        >
                            <TbSunOff size={20} /> Added to My Day
                        </div>
                    ) : (
                        <div className="edit-task-toggle-my-day">
                            <FiSun size={20} /> Add to My Day
                        </div>
                    )}
                </div>
                <div className="edit-task-block">
                    <ul className="edit-task-block-alarms">
                        <li>
                            <BsAlarm size={20} /> Remind me
                        </li>
                        <li>
                            <MdDateRange size={20} /> Add due date
                        </li>
                        <li>
                            <BsArrowRepeat size={20} /> Repeat
                        </li>
                    </ul>
                </div>
                <div className="edit-task-block">
                    <div className="edit-task-toggle-add-file">
                        <MdOutlineAttachFile size={20} /> Add file
                    </div>
                </div>

                <div className="edit-task-block">
                    <div className="edit-task-description">
                        <form onSubmit={handleTaskDescription}>
                            <textarea
                                placeholder="Add note"
                                value={taskDescription}
                                onChange={(e) =>
                                    setTaskDescription(e.target.value)
                                }
                                onBlur={handleTaskDescription}
                            ></textarea>
                        </form>
                    </div>
                </div>
            </div>
            <div className="edit-task-bottom-content">
                <div className="edit-task-block"></div>
            </div>
        </div>
    );
};

export default EditTask;

// add task description feature
// add a box shadow to the edit-task-blocks
// validate the edit task input field, add step input fields, and add note textarea
