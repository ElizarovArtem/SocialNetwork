import React, {ChangeEvent} from 'react';
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {ActionTypes} from "../../../redux/state";
import {PostType} from "../../../redux/ProfileReducer";

type MyPostsPropsType ={
    posts: Array<PostType>
    addPost: () => void
    onNewPostText: (text:string) => void
    newPostText: string
}

export function MyPosts(props: MyPostsPropsType) {

    let onAddPost = () => {
            props.addPost();
    };
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onNewPostText(e.currentTarget.value)
    }

    let postElements = props.posts.map(post => <Post id={post.id} message={post.message} likesCount={post.likesCount}/>)

    return (

        <div className={s.postsBlock}>
            <h3>MY POSTS</h3>
            <div>
                <div>
                    <textarea className={s.messageArea}  onChange={onPostChange} value={props.newPostText}/>
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