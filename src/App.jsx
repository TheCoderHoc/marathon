import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import MainView from "./components/MainView";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="tasks" />} />
            <Route path="tasks" element={<MainView />} />
            <Route path="tasks/:list" element={<MainView />} />
            <Route path="settings" element={<h1>Settings</h1>} />
        </Routes>
    );
};

export default App;
