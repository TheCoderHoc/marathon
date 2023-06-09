import React, { useState } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge, Modal } from "antd";
import { AiOutlineHome, AiOutlineStar } from "react-icons/ai";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { AiOutlinePrinter } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { BsPencil } from "react-icons/bs";
import { deleteList } from "../../features/list/listSlice";
import SidebarListInput from "../SidebarListInput";

const SidebarList = ({ id, path, name, count, type, onDisplayMessage }) => {
    const [isContextMenuOpen, setContextMenuOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [anchorPoints, setAnchorPoints] = useState({ x: 0, y: 0 });
    const [showRenameInput, setShowRenameInput] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleContextMenu = (e) => {
        e.preventDefault();

        setContextMenuOpen(true);

        setAnchorPoints({ x: e.clientX, y: e.clientY });
    };

    const closeContextMenu = () => {
        setContextMenuOpen(false);
    };

    const removeList = () => {
        dispatch(deleteList(id));

        onDisplayMessage({
            type: "success",
            message: `"${name}" list was deleted successfully...`,
        });

        navigate("/tasks");
    };

    const handleOk = () => {
        removeList();
    };

    const handleCancel = () => {
        hideModal();
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const hideModal = () => {
        setModalOpen(false);
    };

    const handlePrintList = () => {
        window.open(path).print();
    };

    const displayRenameInput = () => {
        setShowRenameInput(true);
    };

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

    if (showRenameInput) {
        return (
            <SidebarListInput
                id={id}
                currentName={name}
                mode="edit"
                onDisplayMessage={onDisplayMessage}
                onHideAddList={() => setShowRenameInput(false)}
            />
        );
    }

    return (
        <li className="sidebar-list" onContextMenu={handleContextMenu}>
            <NavLink to={path} end>
                {listIcon}

                <span className="sidebar-list-name">{name}</span>

                <Badge
                    count={count}
                    showZero
                    color="#b5b5b5"
                    className="sidebar-list-count"
                />
            </NavLink>

            <ControlledMenu
                state={isContextMenuOpen ? "open" : "closed"}
                anchorPoint={anchorPoints}
                direction="bottom"
                onClose={closeContextMenu}
            >
                {type === "custom" && (
                    <MenuItem onClick={displayRenameInput}>
                        <BsPencil size={17} /> Rename List
                    </MenuItem>
                )}

                <MenuItem onClick={handlePrintList}>
                    <AiOutlinePrinter size={17} /> Print List
                </MenuItem>
                {type === "custom" && (
                    <MenuItem style={{ color: "red" }} onClick={openModal}>
                        <BsTrash size={17} /> Delete List
                    </MenuItem>
                )}
            </ControlledMenu>

            <Modal
                title="Delete List"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to delete this list?</p>
            </Modal>
        </li>
    );
};

export default SidebarList;
