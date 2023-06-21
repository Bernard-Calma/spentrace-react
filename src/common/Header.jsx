import React from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import "./Header.css"
import Icon from "./Icon";
import { logout } from '../features/userSlice';

const Header = (props) => {
    const {loggedIn, username} = useSelector(store => store.user)
    const dispatch = useDispatch()

    const handleSignOut = async () => {
        // console.log("Sign Out");
        await axios({
            method: "GET",
            url: `${props.server}/users/signout`,
            withCredentials: true
        })
        .then(res => props.setUser({
            username: "",
            loggedIn: false
        }))
        .catch(error => console.log(error));
    };
    
    return(
        <section className='header'>
            <h1 className="title" onClick={props.handleChangeHomeView}>Spentrace</h1> 
            {props.user.loggedIn && <Icon className="fi fi-rr-sign-out-alt" onClick={() => dispatch(logout())} />}
        </section>
    );
};

export default Header;