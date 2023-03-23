import React, { useState } from "react";
import "./styles.css";
import { Avatar, Divider, Button } from "antd";
import { BsMicrosoft } from "react-icons/bs";
import { VscSearch } from "react-icons/vsc";
import userPic from "../../assets/images/user.png";

const Sidebar = () => {
    const [user, setUser] = useState(null);

    return (
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
                            <h3 className="sidebar-user-name">Dave Wilson</h3>
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
                    <li>Some Content</li>
                    <li>Some Content</li>
                    <li>Some Content</li>
                </ul>

                <Divider />

                <ul className="sidebar-custom-lists">
                    <li>Some Content</li>
                    <li>Some Content</li>
                    <li>Some Content</li>
                </ul>
            </div>

            <div className="sidebar-bottom-content">Some content</div>
        </aside>
    );
};

export default Sidebar;
