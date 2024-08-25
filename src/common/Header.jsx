import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { logout } from '../features/userSlice';
import { changeView, toggleNavBar } from '../features/viewSlice';

import Icon from "./Icon";

import "./Header.css"

const Header = () => {
    const {loggedIn} = useSelector(store => store.user)
    const dispatch = useDispatch()
    
    return(
        <section className='header'>
            <Icon 
                className="fi fi-rr-bars-staggered" 
                onClick={() => dispatch(toggleNavBar())} 
            />
            <h1 
                className="title" 
                onClick={() => dispatch(changeView({homeView: "Home"}))}
            >Spentrace</h1> 
            {loggedIn && 
                <Icon 
                    className="fi fi-rr-sign-out-alt" 
                    onClick={() => dispatch(logout())} 
                />
            }
        </section>
    );
};

export default Header;