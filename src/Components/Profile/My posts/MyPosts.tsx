import React from 'react';
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostType} from "../../../redux/ProfileReducer";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


type MyPostsPropsType ={
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}

export class MyPosts extends React.Component<MyPostsPropsType> {


    shouldComponentUpdate(nextProps: Readonly<MyPostsPropsType>, nextState: Readonly<{}>): boolean {
        return nextProps != this.props || nextState != this.state
    }

    render() {

        let onAddPost = (data: NewPostDataType) => {
            this.props.addPost(data.mewPostText);
        };

        let postElements = this.props.posts
            .map(post => <Post id={post.id} message={post.message} likesCount={post.likesCount}/>)

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
}

type NewPostDataType = {
    mewPostText: string
}

const maxLength10 = maxLengthCreator(10)

export const PostField = (props: InjectedFormProps<NewPostDataType>) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field className={s.messageArea}
                   component={Textarea}
                   name={"mewPostText"}
                   placeholder={"Add new post"}
                   validate={[required, maxLength10]}
            />
            <div>
                <button className={s.submitButton}>Submit</button>
            </div>
        </form>
    )
}

export const ReduxPostField = reduxForm<NewPostDataType>({form: "newPost"})(PostField)