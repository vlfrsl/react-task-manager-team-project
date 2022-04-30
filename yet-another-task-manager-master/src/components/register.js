import React, {useState} from "react";
import useFormFields from "../hooks/useFormFields";
import UserService from "../services/UserService";
import useLocalStorage from "../hooks/useLocalStorage";
import {useNavigate} from "react-router";

const Register = () => {
    const {fields, changeFieldValue} = useFormFields({
        login: "",
        email: "",
        password: "",
        retype: "",
    })

    const [user, setUser] = useLocalStorage('user', null);
    const [serverErrors, setServerErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(fields.password !== fields.retype){
            setServerErrors([{id: "passwords_not_match", message: "Error passwords not match"}]);
            return;
        }

        UserService.register({
            email: fields.email,
            username: fields.login,
            password: fields.password,
        }).then((result) => {
            if (typeof result['jwt'] === 'string') {
                setUser(result);
                navigate('/');
            } else {
                setServerErrors(result.message[0].messages);
            }
        }).catch((error) => {
            setServerErrors([{id: "Unknown_error", message: "Can not send request please try again later"}]);
        });
    }

    return (
        <article className="grid" >
            <form onSubmit={handleSubmit} >
                <h2>Register</h2>
                <div className="mb-3">
                <label htmlFor="nameInput" className="form-label"> Name</label>
                    <input
                        name="login"
                        required
                        onChange={changeFieldValue}
                        value={fields.login}
                        className="form-control"
                        id="nameInput"
                    />

                </div>
                <div className="mb-3">
                <label htmlFor="emailInput" className="form-label"> Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        onChange={changeFieldValue}
                        value={fields.email}
                        className="form-control"
                        id="emailInput"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input name="password"
                           type="password"
                           required
                           onChange={changeFieldValue}
                           value={fields.password}
                           className="form-control"
                           id="passwordInput"
                    />
                </div>
                <div className="mb-3">
                <label htmlFor="passwordConfirmInput" className="form-label"> Password Confirm</label>
                    <input name="retype"
                           type="password"
                           required
                           onChange={changeFieldValue}
                           value={fields.retype}
                           className="form-control"
                           id="passwordConfirmInput"
                    />
                </div>
                <button className="btn btn-primary">Register</button>
            </form>
            <ul className="errors-list">
                {serverErrors.map((error) => {
                    return (<li className="alert alert-danger" key={error.id}>{error.message}</li>);
                })}
            </ul>
        </article>
    )
}

export default Register;