import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/urls";
import user from "reducers/user";
import './GlobalStyles';
import './Login.css';
import { InnerWrapper, OuterWrapper } from "./GlobalStyles";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken);
    const navigate = useNavigate();
    const error = useSelector(store => store.user.error);
    useEffect(() => {
        if(accessToken) {
            navigate("/main")
        }
    }, [accessToken]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(user.actions.setError(null));
        
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        }
        fetch (API_URL(mode), options)
        .then(res => res.json())
        .then (data => {
            if(data.success) {

                dispatch(user.actions.setAccessToken(data.response.accessToken))
                dispatch(user.actions.setUsername(data.response.username))
                dispatch(user.actions.setUserId(data.response.id))
                dispatch(user.actions.setError(null))
                setUsername("")
                setPassword("")
            } else {
                dispatch(user.actions.setAccessToken(null))
                dispatch(user.actions.setUsername(null))
                dispatch(user.actions.setUserId(null))
                dispatch(user.actions.setError(data.response))
            }
        })
        .catch (err => {
            dispatch(user.actions.setError("Failed to connect. Please try again."));
        })
    }
    return(
        <OuterWrapper>
            <InnerWrapper>
                <section className="login-section">
                    <h1>&lt;project&#45;authentication&gt;</h1>
                    <section className="radio-buttons-wrapper">
                        <section className="label-input-wrapper">
                            <label htmlFor="register">&lt;register&gt;</label>
                            <input
                            type="radio"
                            id="register"
                            checked={mode === "register"} 
                            onChange={() => setMode("register")}/>
                        </section>
                        <section className="label-input-wrapper">
                            <label htmlFor="login">&lt;log-in&gt;</label>
                            <input
                            type="radio"
                            id="login" 
                            checked={mode === "login"} 
                            onChange={() => setMode("login")}/>
                        </section>
                    </section>
                    <form onSubmit={onFormSubmit} autoComplete="off" >
                        <section className="label-input-wrapper">
                            <label htmlFor="username">&lt;username&gt;</label>
                            <input 
                                type="text" 
                                id="username" 
                                value={username}
                                onChange={e => {setUsername(e.target.value)}} />
                        </section>
                        <section className="label-input-wrapper">
                            <label htmlFor="password">&lt;password&gt;</label>
                            <input 
                                type="password" 
                                id="password"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value)}} />
                        </section>
                        {error !== null && mode==="register" && <p>Sorry, username already exists.</p> }
                        {error !== null && mode==="login" && <p>Sorry, credentials do not match.</p> }
                        <button type="submit">&lt;submit&gt;</button>
                    </form>
                </section>
            </InnerWrapper>
        </OuterWrapper>
    );
}

export default Login;