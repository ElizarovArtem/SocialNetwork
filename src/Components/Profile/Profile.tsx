import React from 'react';
import s from "./Profile.module.css";
import {MyPosts} from "./My posts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {PostType} from "./My posts/Post/Post";

type ProfilePropsType ={
    profileState: ProfileStateType
    addPost: () => void
    changeNewPostText: (newText: string) => void
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
                     addPost={props.addPost}
                     changeNewPostText={props.changeNewPostText}
                      />
        </div>
    );
}