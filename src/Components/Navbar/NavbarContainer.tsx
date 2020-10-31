import React from 'react';
import s from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import {Friend} from './Friends/Friend';
import {FriendsPropsType} from "../../redux/SidebarReducer";
import {Navbar} from "./Navbar";
import store from "../../redux/redux-store";

type NavbarPropsType = {}

export function NavbarContainer(props: NavbarPropsType) {

    let state = store.getState().sidebar

    return <Navbar friends={state.friends}/>
}

