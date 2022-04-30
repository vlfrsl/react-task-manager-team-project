import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import {createContext, useState, useContext} from "react";
import TaskService from "../../services/TaskService.js";
import useLoader from "../../hooks/useLoader";


export const TasksContext = createContext([]);

const TasksDataContext = ({children}) => {
    const [tasks, setTasks] = useState([])
    const [loader, showLoader, hideLoader, loading] = useLoader();

    async function deleteCard (id) {
       await TaskService.deleteCard(id);
       const updatedTasksList = tasks.filter(task => task.id !== id);
        setTasks(updatedTasksList);
    }

    useEffect(async ()=>{
        showLoader();
        const tasksList = await TaskService.getCards();
        hideLoader();
        setTasks(tasksList);
    },[])

    return (
        <TasksContext.Provider value={{tasks, setTasks, deleteCard}}>
            {loader}
            {!loading ? children : ''}
        </TasksContext.Provider>
    );
};

export const useGetTasksByType = (requestedStatus) => {
    const {tasks} = useContext(TasksContext);
    const tasksList = tasks.filter(({status}) => status === requestedStatus);

    return tasksList;
}

export const useUpdateCards = () => {
    const {setTasks} = useContext(TasksContext);

    return async () => {
        const actualTasks = await TaskService.getCards()
        setTasks(actualTasks);
    }

}

TasksDataContext.propTypes = {
    children: PropTypes.node
};

export default TasksDataContext;