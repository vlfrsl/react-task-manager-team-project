import React from "react";
import MainNav from "./main-nav";
import {Link} from "react-router-dom";

function Header() {
    return (<nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Yet Another Task Manager</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <MainNav/>
                </ul>
            </div>
        </div>
    </nav>)
}

export default Header;