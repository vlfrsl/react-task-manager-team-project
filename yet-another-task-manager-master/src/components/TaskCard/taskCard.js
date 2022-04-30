import React, {useContext} from "react";
import {TasksContext} from "../TasksDataContext/TasksDataContext.js";
import iconUpdate from "../../images/pencil-svgrepo-com.svg";
import {convertTime} from "../../utils/time";

export const TaskCard = ({title, description, id, onUpdate, updateTime}) => {
    //id="cd2"
    const {deleteCard} = useContext(TasksContext)

    return (
        <div className="card draggable shadow-sm">
            <div className="card-body card-for-style p-2">
                <div className="card-title">
                    <h3 className="lead font-weight-bold">{title}</h3>
                </div>
                <p>
                    {description}
                </p>

                <p>Update task: {convertTime(updateTime)}</p>
                <div className="wrapper-btn">
                <button className="btn btn-warning" onClick={onUpdate}><img className="updateIcon" src={iconUpdate} /></button>
                <button className="btn btn-danger"  onClick={()=>deleteCard(id)}>X</button>
                </div>
            </div>
        </div>
    )
}