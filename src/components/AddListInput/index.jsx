import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";
import { FaTasks } from "react-icons/fa";
import { addList as addListToStore } from "../../features/list/listSlice";
import useValidate from "../../hooks/useValidate";

const AddListInput = ({ onHideAddList, onDisplayMessage }) => {
    const [listName, setListName] = useState("Untitled List");
    const [errorMsg, setErrorMsg] = useState("");

    const inputRef = useRef(null);

    const allLists = useSelector((state) => state.list.lists);

    const dispatch = useDispatch();

    const validate = useValidate();

    const navigate = useNavigate();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const existingList = allLists.find((list) => list.name === listName);
        const error = validate(listName);

        if (existingList) {
            return setErrorMsg("There is already a list with that name...");
        }

        if (error) {
            return setErrorMsg(error);
        }

        setErrorMsg("");

        addList();
    };

    const addList = () => {
        const path = `/tasks/${listName.replaceAll(" ", "-").toLowerCase()}`;

        const newList = {
            id: Date.now(),
            path: path,
            name: listName,
            type: "custom",
            count: 0,
            tasks: [],
        };

        // add to store and local storage
        dispatch(addListToStore(newList));

        onHideAddList();

        // display a success message
        onDisplayMessage({
            type: "success",
            message: `"${listName}" list was added successfully...`,
        });

        setListName("");

        // redirect to path of the new list
        navigate(path);
    };

    return (
        <>
            <form className="add-list-input-form" onSubmit={handleSubmit}>
                <FaTasks size={17} color="#357ec7" />
                <input
                    type="text"
                    className="add-list-input-field"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    onBlur={handleSubmit}
                    ref={inputRef}
                />
            </form>

            {errorMsg && <Alert type="error" message={errorMsg} />}
        </>
    );
};

export default AddListInput;
