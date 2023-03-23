import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import MainView from "./components/MainView";
import store from "./app/store";

const App = () => {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Navigate to="tasks" />} />
                <Route path="tasks" element={<MainView />} />
                <Route path="tasks/:list" element={<MainView />} />
                <Route path="settings" element={<h1>Settings</h1>} />
            </Routes>
        </Provider>
    );
};

export default App;
