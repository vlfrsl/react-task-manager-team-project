import ReactDOM from 'react-dom';
import React from 'react';
import {
    Route,
    Routes,
    BrowserRouter,
    Navigate
} from "react-router-dom";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Header from "./components/header";

import {TasksInterface} from "./components/UserTasksInterface/tasksInterface.js";

import './styles/index.css'

const App = () => {
    return  ( <BrowserRouter>
        <Header />

        <div className="container">
            <Routes>
                {/*<Route path="/" element={<Dashboard />} />*/}
                {/*<Route path="" element={<Dashboard />} />*/}
                <Route path="/" element={<TasksInterface />} />
                <Route path="" element={<TasksInterface />} />

                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
        </div>
    </BrowserRouter>);
}

ReactDOM.render(<App />, document.getElementById('app'));