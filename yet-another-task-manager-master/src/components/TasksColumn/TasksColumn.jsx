import React from 'react';
import PropTypes from 'prop-types';
import {useGetTasksByType} from "../TasksDataContext/TasksDataContext.js";

import {TaskCard} from "../TaskCard/taskCard.js";


const TasksColumn = ({title, type, onUpdate}) => {
    const tasks = useGetTasksByType(type);

    return (
        <>
            <div className="col-sm-6 col-md-4 col-xl-3 for-border">

                <div className="card bg-light">
                    <div className="card-body">
                        <div className="row">
                            <h4 className="card-title text-uppercase text-truncate py-2 col-10">{title}</h4>
                        </div>


                        {tasks.map(task =>
                            <TaskCard
                                key = {task.id}
                                title = {task.title}
                                description = {task.description}
                                id={task.id}
                                updateTime = {task.updated_at}
                                onUpdate = {() => {onUpdate(task)}
                            }
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
};

// TasksColumn.propTypes = {
//     title: PropTypes.string
// };

export default TasksColumn;