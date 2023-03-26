import React, { useState } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addTask } from "../../features/task/taskSlice";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";

const AddTask = () => {
    const [taskName, setTaskName] = useState("");
    const [switchIcon, setSwitchIcon] = useState(false);

    const dispatch = useDispatch();

    const { list } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        let important = false;

        if (list === "important") {
            important = true;
        }

        const newTask = {
            id: Date.now() * 10,
            name: taskName,
            description: "",
            completed: false,
            important,
            lists: list ? [list] : [],
            createdAt: JSON.stringify(new Date()),
        };

        dispatch(addTask(newTask));

        // increment the appropiate list

        setTaskName("");
    };

    return (
        <form className="add-task" onSubmit={handleSubmit}>
            {!switchIcon ? <AiOutlinePlus size={20} /> : <BsCircle size={20} />}
            <input
                type="text"
                placeholder="Add a task"
                className="add-task-input"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onFocus={() => setSwitchIcon(true)}
                onBlur={() => setSwitchIcon(false)}
            />
        </form>
    );
};

export default AddTask;
