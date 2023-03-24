import React, { useState } from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { Avatar, Divider, Button, message } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { BsMicrosoft } from "react-icons/bs";
import { VscSearch } from "react-icons/vsc";
import SidebarList from "../SidebarList";
import AddListInput from "../AddListInput";
import userPic from "../../assets/images/user.png";

const Sidebar = () => {
    const [isAddList, setAddList] = useState(false);
    const [user, setUser] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    const lists = useSelector((state) => state.list.lists);

    const showAddList = () => {
        setAddList(true);
    };

    const hideAddList = () => {
        setAddList(false);
    };

    const displayMessage = ({ type, message }) => {
        messageApi.open({
            type,
            content: message,
        });
    };

    return (
        <>
            {contextHolder}
            <aside className="sidebar">
                <div className="sidebar-top-content">
                    {user ? (
                        <div className="sidebar-user">
                            <div className="sidebar-user-image">
                                <Avatar
                                    src={userPic}
                                    size="large"
                                    alt="User Profile Photo"
                                />
                            </div>
                            <div className="sidebar-user-info">
                                <h3 className="sidebar-user-name">
                                    Dave Wilson
                                </h3>
                                <p className="sidebar-user-status">
                                    You're offline...
                                </p>
                            </div>
                        </div>
                    ) : (
                        <Button
                            type="primary"
                            icon={<BsMicrosoft />}
                            block
                            className="sidebar-login-btn"
                            onClick={() => console.log("Coming soon...")}
                        >
                            Login Microsoft
                        </Button>
                    )}

                    <form className="sidebar-search-form">
                        <input
                            type="text"
                            placeholder="Search"
                            className="sidebar-search-input"
                        />
                        <VscSearch size={17} />
                    </form>

                    <ul className="sidebar-default-lists">
                        {lists.map(
                            (list) =>
                                list.type === "default" && (
                                    <SidebarList key={list.id} {...list} />
                                )
                        )}
                    </ul>

                    <Divider />

                    <ul className="sidebar-custom-lists">
                        {isAddList && (
                            <AddListInput
                                onHideAddList={hideAddList}
                                onDisplayMessage={displayMessage}
                            />
                        )}
                    </ul>
                </div>

                <div className="sidebar-bottom-content">
                    <div className="sidebar-add-list" onClick={showAddList}>
                        <AiOutlinePlus size={25} />
                        <span className="sidebar-add-list-text">New List</span>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
