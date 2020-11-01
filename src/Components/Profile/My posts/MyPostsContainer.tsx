import React from 'react';
import {MyPosts} from "./MyPosts";
import StoreContext from "../../../StoreContext";


type MyPostsPropsType = {}

export function MyPostsContainer(props: MyPostsPropsType) {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().profilePage

                    let addPost = () => {
                        store.dispatch({type: "ADD-POST"});
                    };
                    let onPostChange = (text: string) => {
                        store.dispatch({type: "CHANGE-NEW-POST-TEXT", newText: text});
                    }

                    return (
                        <MyPosts newPostText={state.newPostText} posts={state.posts} addPost={addPost}
                                 onNewPostText={onPostChange}/>
                    )
                }
            }
        </StoreContext.Consumer>
    )
}