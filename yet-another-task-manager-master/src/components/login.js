import React, {useState} from "react";
import useFormFields from "../hooks/useFormFields";
import useLocalStorage from "../hooks/useLocalStorage";
import {useNavigate} from "react-router";
import UserService from "../services/UserService";

function Login() {
    const {fields, changeFieldValue} = useFormFields({
        identifier: '',
        password: '',
    });

    const [user, setUser] = useLocalStorage('user', null);
    const [serverErrors, setServerErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        UserService.login(fields).then((result) => {
            if (typeof result['jwt'] === 'string') {
                setUser(result);
                navigate('/');
            } else {
                setServerErrors(result.message[0].messages);
            }
        }).catch((error) => {
            console.log('error', error);
        });
    }

    return (<article className="grid">
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div className="mb-3">
                <label htmlFor="loginInput" className="form-label">Email</label>

                <input
                    name="identifier"
                    type="text"
                    required
                    className="form-control"
                    onChange={changeFieldValue}
                    value={fields.identifier}
                    id="loginInput"
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

            <button className="btn btn-primary">Login</button>
        </form>

        <ul className="errors-list mt-2">
            {serverErrors.map((error) => {
                return (<li className="alert alert-danger" key={error.id}>{error.message}</li>);
            })}
        </ul>
    </article>)
}

export default Login;