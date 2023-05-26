import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_URL } from "utils/urls";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import thoughts from "reducers/thoughts";
import './GlobalStyles';
import './Main.css';
import { InnerWrapper, OuterWrapper } from "./GlobalStyles";

const Main = () => {
    const thoughtItems = useSelector((store) => store.thoughts.items);
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken);
    const username = useSelector(store => store.user.username);
    const navigate = useNavigate();
    useEffect(() => {
        if (!accessToken) {
            navigate("/login")
        }
    }, [accessToken]);

    useEffect(() => {
        const options = {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(API_URL("thoughts"), options)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                dispatch(thoughts.actions.setError(null))
                dispatch(thoughts.actions.setItems(data.response))
            } else {
                dispatch(thoughts.actions.setError(data.response))
                dispatch(thoughts.actions.setItems([]))
            }
        })
    })

    const onLogoutButtonClick = () => {
        dispatch(user.actions.setAccessToken(null))
        dispatch(user.actions.setUsername(null))
        dispatch(user.actions.setUserId(null))
        dispatch(user.actions.setError(null))
        dispatch(thoughts.actions.setItems([]))
    }
    return(
        <OuterWrapper>
            <InnerWrapper>
                <section className="main-wrapper">
                    <button type="button" onClick={onLogoutButtonClick}>Logout</button>
                    {username ? (<h2>These are the thoughts of {username.toUpperCase()}</h2>):""}
                    {thoughtItems.map(item => {
                        return(<p key={item._id}>{item.message}</p>)
                    })}
                </section>
            </InnerWrapper>
        </OuterWrapper>
    );
}

export default Main;