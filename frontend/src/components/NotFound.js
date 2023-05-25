import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {

    return(
        <>
            <p>Sorry, nothing here :/</p>
            <Link to="/login">Go to Login</Link>
            <Link to="/">Go to Main</Link>
        </>
    );
}

export default NotFound;