import React, {ChangeEvent} from 'react';
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {ActionTypes, ProfilePageType} from "../../../redux/state";


type MyPostsPropsType ={
    myPostsState: ProfilePageType
    addPost: () => void
    onNewPostText: (text:string) => void
}

export function MyPosts(props: MyPostsPropsType) {

    let onAddPost = () => {
            props.addPost();
    };
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onNewPostText(e.currentTarget.value)
    }

    let postElements = props.myPostsState.posts.map(post => <Post id={post.id} message={post.message} likesCount={post.likesCount}/>)

    return (

        <div className={s.postsBlock}>
            <h3>MY POSTS</h3>
            <div>
                <div>
                    <textarea className={s.messageArea}  onChange={onPostChange} value={props.myPostsState.newPostText}/>
                </div>
                <div>
                    <button className={s.submitButton} onClick={onAddPost}>Submit</button>
                </div>
            </div>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>

    );
}