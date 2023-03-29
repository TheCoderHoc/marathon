import React, { useState } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import {
    renameTask as renameTaskInStore,
    addStep,
} from "../../features/task/taskSlice";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import TaskStepItem from "../TaskStepItem";

const EditTask = ({
    id,
    currentName,
    steps,
    taskIcon,
    importanceIcon,
    onToggleImportance,
}) => {
    const [editedTaskName, setEditedTaskName] = useState(currentName);
    const [taskStepName, setTaskStepName] = useState("");
    const [switchIcon, setSwitchIcon] = useState(false);

    const [selectedStepId, setSelectedStepId] = useState(0);

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
                <div className="edit-task-block"></div>
                <div className="edit-task-block"></div>
                <div className="edit-task-block"></div>
            </div>
            <div className="edit-task-bottom-content">
                <div className="edit-task-block"></div>
            </div>
        </div>
    );
};

export default EditTask;

// disable and deselect task step item onBlur
// reduce some paddings
