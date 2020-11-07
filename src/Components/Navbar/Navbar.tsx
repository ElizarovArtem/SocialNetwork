import React from 'react';
import s from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import {Friend} from './Friends/Friend';
import {SidebarPageType} from "../../redux/state";

type NavbarPropsType ={
    sidebarState: SidebarPageType
}

export function Navbar(props: NavbarPropsType) {

    let friendItem = props.sidebarState.friends.map(friend => <Friend name={friend.name}/>)

    return (
        <div className={s.nav}>
            <nav className={s.nav}>
                <div className={s.item}>
                    <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/news" activeClassName={s.active}>News</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/music" activeClassName={s.active}>Music</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/settings" activeClassName={s.active}>Settings</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
                </div>
            </nav>
            <h3>FRIENDS</h3>
            <div className={s.friends + ' ' + s.friendItem}>
                {friendItem}
            </div>
        </div>
    );
}

