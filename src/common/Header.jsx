import React from 'react';
import axios from "axios";
import "./Header.css"
import Icon from "./Icon";

const Header = (props) => {
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
            {props.user.loggedIn && <Icon className="fi fi-rr-sign-out-alt" onClick={handleSignOut} />}
        </section>
    );
};

export default Header;