import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken);
    const onFormSubmit = (e) => {
        e.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        }
    }
    return(
        <form onSubmit={onFormSubmit}>
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                id="username" 
                value={username}
                onChange={e => setUsername(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
}

export default Login;