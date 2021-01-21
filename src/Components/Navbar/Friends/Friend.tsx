import React from 'react';
import s from "./Friend.module.css";
import {FriendsPropsType} from "../../../redux/SidebarReducer";
import userAva from './../../../assets/images/userAvajpg.jpg'


export function Friend(props: FriendsPropsType) {
    return (
        <div className={s.friendItem}>
            <img src={userAva}/>
            <p>{props.name}</p>
        </div>
    );
}