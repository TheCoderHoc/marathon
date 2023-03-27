import React, { useState } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { renameTask as renameTaskInStore } from "../../features/task/taskSlice";
import { AiOutlinePlus } from "react-icons/ai";

const EditTask = ({
    id,
    currentName,
    taskIcon,
    importanceIcon,
    onToggleImportance,
}) => {
    const [editedTaskName, setEditedTaskName] = useState(currentName);
    const [stepName, setStepName] = useState("");

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

    return (
        <div className="edit-task">
            <div className="edit-task-top-content">
                <div className="edit-task-block">
                    <form
                        className="edit-task-info"
                        onSubmit={handleRenameTask}
                    >
                        {taskIcon}
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
                    <form className="edit-task-add-steps">
                        <AiOutlinePlus size={18} color="#357ec7" />
                        <input
                            type="text"
                            placeholder="Add Step"
                            className="edit-task-add-steps-input"
                            value={stepName}
                            onChange={(e) => setStepName(e.target.value)}
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

// steps can be added to tasks and canbe completed or uncompleted, and can be promoted to task and can also be deleted
