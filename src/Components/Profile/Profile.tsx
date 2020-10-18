import React from 'react';
import s from "./Profile.module.css";
import {MyPosts} from "./My posts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {PostType} from "./My posts/Post/Post";
import {ActionTypes} from "../../redux/state";

type ProfilePropsType ={
    profileState: ProfileStateType
    dispatch: (action: ActionTypes) => void
}
type ProfileStateType ={
    posts: Array<PostType>
    newPostText: string
}

export function Profile(props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profileState.posts}
                     newPostText={props.profileState.newPostText}
                     dispatch={props.dispatch}
                      />
        </div>
    );
}