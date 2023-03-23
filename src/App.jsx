import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="tasks" />} />
            <Route path="tasks" element={<h1>All Tasks</h1>} />
            <Route path="tasks/:list" element={<h1>Filtered Tasks</h1>} />
            <Route path="settings" element={<h1>Settings</h1>} />
        </Routes>
    );
};

export default App;
