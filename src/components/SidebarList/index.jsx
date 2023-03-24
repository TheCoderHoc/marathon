import React, { useState } from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { Badge } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { AiOutlinePrinter } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { BsPencil } from "react-icons/bs";

const SidebarList = ({ path, name, count, type }) => {
    const [isOpen, setOpen] = useState(false);
    const [anchorPoints, setAnchorPoints] = useState({ x: 0, y: 0 });

    const handleContextMenu = (e) => {
        e.preventDefault();

        setOpen(true);

        setAnchorPoints({ x: e.clientX, y: e.clientY });
    };

    const closeContextMenu = () => {
        setOpen(false);
    };

    let listIcon = <FaTasks size={17} color="#357ec7" />;

    if (path === "/my-day") {
        listIcon = <FiSun size={17} color="#357ec7" />;
    }

    if (path === "/tomorrow") {
        listIcon = <BsCalendarDate size={17} color="#357ec7" />;
    }

    if (path === "/tasks") {
        listIcon = <AiOutlineHome size={17} color="#357ec7" />;
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
                state={isOpen ? "open" : "closed"}
                anchorPoint={anchorPoints}
                direction="bottom"
                onClose={closeContextMenu}
            >
                {type === "custom" && (
                    <MenuItem>
                        <BsPencil size={17} /> Rename List
                    </MenuItem>
                )}

                <MenuItem>
                    <AiOutlinePrinter size={17} /> Print List
                </MenuItem>
                {type === "custom" && (
                    <MenuItem style={{ color: "red" }}>
                        <BsTrash size={17} /> Delete List
                    </MenuItem>
                )}
            </ControlledMenu>
        </li>
    );
};

export default SidebarList;
