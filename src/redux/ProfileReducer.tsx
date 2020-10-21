import {ActionTypes, profilePageType} from "./state";
import {PostType} from "../Components/Profile/My posts/Post/Post";

export type AddPostActionType = ReturnType<typeof AddPostActionCreator>
export type ChangeNewPostTextActionType = ReturnType<typeof ChangeNewPostTextActionCreator>

const ADD_POST = "ADD-POST"
const CHANGE_NEW_POST_TEXT = "CHANGE-NEW-POST-TEXT"

const ProfileReducer = (state: profilePageType, action: ActionTypes) => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostType = {id: 5, message: state.newPostText, likesCount: 0};
            state.posts.push(newPost);
            state.newPostText = "";
            return state;
        case CHANGE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

const AddPostActionCreator = () => {
    return {
        type: ADD_POST
    } as const
};
const ChangeNewPostTextActionCreator = (postText: string) => {
    return {
        type: CHANGE_NEW_POST_TEXT,
        newText: postText
    } as const
};

export default ProfileReducer;