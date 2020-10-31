import React from 'react';
import s from "./Post.module.css";
import {PostType} from "../../../../redux/ProfileReducer";



export function Post(props: PostType) {
    return (

            <div className={s.item}>
                <img src="https://img1.liveinternet.ru/images/attach/c/6/93/68/93068365_508790c345c65.jpg"/>
                {props.message}
                <div>
                    <span>Likes: {props.likesCount}</span>
                </div>
            </div>
    );
}