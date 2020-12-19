import React, {ChangeEvent} from 'react';
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {InitialStateType} from "../../../redux/ProfileReducer";
import {reduxForm, Field, InjectedFormProps} from "redux-form";


type MyPostsPropsType ={
    myPostsState: InitialStateType
    addPost: (newPostText: string) => void
}

export function MyPosts(props: MyPostsPropsType) {

    let onAddPost = (data: NewPostDataType) => {
            props.addPost(data.mewPostText);
    };

    let postElements = props.myPostsState.posts.map(post => <Post id={post.id} message={post.message} likesCount={post.likesCount}/>)

    return (
        <div className={s.postsBlock}>
            <h3>MY POSTS</h3>
           <ReduxPostField onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    );
}

type NewPostDataType = {
    mewPostText: string
}

export const PostField = (props: InjectedFormProps<NewPostDataType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field className={s.messageArea}
                   component={"textarea"}
                   name={"mewPostText"}
                   placeholder={"Add new post"}
            />
            <div>
                <button className={s.submitButton}>Submit</button>
            </div>
        </form>
    )
}

export const ReduxPostField = reduxForm<NewPostDataType>({form: "newPost"})(PostField)