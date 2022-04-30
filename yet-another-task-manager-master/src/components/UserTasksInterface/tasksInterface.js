import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import ColumnsTypeContext from "../TypeColumnContext/TypeColumnContext.js";
import TasksDataContext from "../TasksDataContext/TasksDataContext.js";

import {Dashboard} from "../dashboard.js"
import useLocalStorage from "../../hooks/useLocalStorage";

export const TasksInterface = () => {
    const [user, setUser] = useLocalStorage('user', null);

    return user ? <ColumnsTypeContext>
        <TasksDataContext>
            <Dashboard/>
        </TasksDataContext>
    </ColumnsTypeContext> :  <Navigate to={"/login"} />

}