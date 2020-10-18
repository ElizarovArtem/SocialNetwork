import React, {ChangeEvent} from 'react';
import s from "./MyPosts.module.css";
import {Post, PostType} from "./Post/Post";
import {ActionTypes} from "../../../redux/state";

type MyPostsPropsType ={
    posts: Array<PostType>
    dispatch: (action:ActionTypes) => void
    newPostText: string
}

export function MyPosts(props: MyPostsPropsType) {

    let addPost = () => {
            props.dispatch({type: "ADD-POST"});
    };
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch({type: "CHANGE-NEW-POST-TEXT", newText: e.currentTarget.value});
    }

    let postElements = props.posts.map(post => <Post id={post.id} message={post.message} likesCount={post.likesCount}/>)

    return (

        <div className={s.postsBlock}>
            <h3>MY POSTS</h3>
            <div>
                <div>
                    <textarea  onChange={onPostChange} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Submit</button>
                </div>
            </div>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>

    );
}