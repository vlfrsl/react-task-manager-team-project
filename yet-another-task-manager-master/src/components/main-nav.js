import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

function MainNav() {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage('user', null);
    const logout = (event) => {
        event.preventDefault();

        setUser(null);
        navigate('/login')
    };

    if (user) {
        return (<>
            <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
            <li className="nav-item"><a href="#" className="nav-link" onClick={logout}>Logout</a></li>
            <li className="nav-item"><span className="nav-link">{user.user.username}</span></li>
        </>);
    } else {
        return (<>
            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
        </>)
    }
}

export default MainNav;