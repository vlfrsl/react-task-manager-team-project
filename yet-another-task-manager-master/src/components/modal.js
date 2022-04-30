import React, {useContext,useEffect} from "react";
import {useState} from "react";
import "../styles/modal.css";
import useFormFields from "../hooks/useFormFields";
import TaskService from "../services/TaskService";
import {useUpdateCards} from "./TasksDataContext/TasksDataContext.js";
import {ColumnsContext} from "./TypeColumnContext/TypeColumnContext";

const Modal = ({active, setActive, currentTask}) => {
    const [serverErrors, setServerErrors] = useState([]);
    const updateCards = useUpdateCards();

    const {fields, changeFieldValue, setFormFields} = useFormFields({
        title: '',
        description: '',
        status: "to_do",
    })
    const {columnTypes} = useContext(ColumnsContext);

    useEffect(() => {
        setFormFields({
            title: currentTask.title + '',
            description: currentTask.description + '',
            status: currentTask ? currentTask.status + '' : "to_do",
        });
    }, [currentTask])

    const handleSubmit = (e) => {
        e.preventDefault();

        let promise;
        if (currentTask.id) {
            promise = TaskService.updateCard(currentTask.id, {
                title: fields.title,
                description: fields.description,
                status: fields.status,
            });
        } else {
            promise = TaskService.createCard({
                title: fields.title,
                description: fields.description,
                status: fields.status,
            });
        }
        promise.then((result) => {
            if (result.id) {
                setActive(false);

                updateCards();
            } else {
                setServerErrors(Object.values(result.data.errors).flat());
            }
        }).catch((error) => {
            setServerErrors([{id: "Unknown_error", message: "Can not send request please try again later"}]);
        })
    }
    return (
        <div className={active ? "modal fade show" : "modal fade"}
             style={{display: active ? 'block' : 'none'}}
             tabIndex="-1"
             role="dialog"
             onClick={(e) => {
                 setActive(false)}}>

            <div className="modal-dialog" role="document"
                 onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{currentTask.id ? "Update card" : "Create card"}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                onClick={() => setActive(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="titleInput" className="form-label">Title</label>
                                <input
                                    name="title"
                                    required
                                    value={fields.title}
                                    onChange={changeFieldValue}
                                    className="form-control"
                                    id="titleInput"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descriptionInput" className="form-label">Description</label>
                                <input
                                    name="description"
                                    required
                                    value={fields.description}
                                    onChange={changeFieldValue}
                                    className="form-control"
                                    id="descriptionInput"
                                />
                            </div>

                            <label htmlFor="exampleFormControlSelect1">Status</label>

                            <select name="status"
                                    className="form-control"
                                    id="exampleFormControlSelect1"
                                    value={fields.status}
                                    onChange={changeFieldValue}>
                                {columnTypes.map((status) => {
                                    return (
                                        <option value={status} key={status.value}>{status.title}</option>
                                    )
                                })}
                            </select>

                            <div className="modal-footer">
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Save changes
                                </button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        onClick={() => setActive(false)}>Close
                                </button>

                                <ul className="errors-list">
                                    {serverErrors.map((error) => {
                                        return (<li className="alert alert-danger" key={error}>{error}</li>);
                                    })}
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;