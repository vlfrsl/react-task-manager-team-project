import React, {useContext} from "react";
import {ColumnsContext} from "../TypeColumnContext/TypeColumnContext.js";
import TasksColumn from "../TasksColumn/TasksColumn.jsx";

export const ColumnList = () => {
    const {columnTypes} = useContext(ColumnsContext);

    return (
        columnTypes.map( ({title, value},index) =>
             <TasksColumn
                 key = {index}
                 title={title}
                 type={value}
             />
        )
    )
}