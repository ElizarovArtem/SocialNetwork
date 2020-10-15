import React from 'react';
import s from "./Friend.module.css";


export type FriendsPropsType = {
    name: string
}

export function Friend(props: FriendsPropsType) {
    return (
        <div className={s.friendItem}>
            <img src="https://www.perunica.ru/uploads/posts/2019-03/1552932077_1.jpg"/>
            <p>{props.name}</p>
        </div>
    );
}