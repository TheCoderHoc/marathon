import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { Badge } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

const SidebarList = ({ path, name, count }) => {
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
        <li className="sidebar-list">
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
        </li>
    );
};

export default SidebarList;
