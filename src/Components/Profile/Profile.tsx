import React from 'react';
import s from "./Profile.module.css";
import {MyPosts} from "./My posts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionTypes} from "../../redux/state";
import {PostType} from "../../redux/ProfileReducer";
import {MyPostsContainer} from "./My posts/MyPostsContainer";

type ProfilePropsType ={
    store: any
}
type ProfileStateType ={
    posts: Array<PostType>
    newPostText: string
}

export function Profile(props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    );
}