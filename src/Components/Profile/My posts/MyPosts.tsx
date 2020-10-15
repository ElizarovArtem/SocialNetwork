import React, {ChangeEvent} from 'react';
import s from "./MyPosts.module.css";
import {Post, PostType} from "./Post/Post";

type MyPostsPropsType ={
    posts: Array<PostType>
    addPost: () => void
    newPostText: string
    changeNewPostText: (newText: string) => void
}

export function MyPosts(props: MyPostsPropsType) {

    let addPost = () => {
            props.addPost();
    };
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeNewPostText(e.currentTarget.value);
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