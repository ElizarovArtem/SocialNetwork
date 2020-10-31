import React, {ChangeEvent} from 'react';
import {MyPosts} from "./MyPosts";
import store from "../../../redux/redux-store";


type MyPostsPropsType = {}

export function MyPostsContainer(props: MyPostsPropsType) {
    let state = store.getState().profilePage

    let addPost = () => {
        store.dispatch({type: "ADD-POST"});
    };
    let onPostChange = (text: string) => {
        store.dispatch({type: "CHANGE-NEW-POST-TEXT", newText: text});
    }

    return <MyPosts newPostText={state.newPostText} posts={state.posts} addPost={addPost} onNewPostText={onPostChange}/>
}