import {ActionTypes} from "./state";

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type AddPostActionType = ReturnType<typeof AddPostActionCreator>
export type ChangeNewPostTextActionType = ReturnType<typeof ChangeNewPostTextActionCreator>

const ADD_POST = "ADD-POST"
const CHANGE_NEW_POST_TEXT = "CHANGE-NEW-POST-TEXT"

let initialState: InitialStateType = {
    newPostText: "it-kamasutra",
    posts: [
        {id: 1, message: "Hello everybody", likesCount: 23},
        {id: 2, message: "Who want's to go for a walk?", likesCount: 12},
        {id: 2, message: "Go alone", likesCount: 12},
    ]
}

export type InitialStateType = {
    posts: Array<PostType>
    newPostText: string
}

export const ProfileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    debugger
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {id: 5, message: state.newPostText, likesCount: 0};
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case CHANGE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        default:
            return state;
    }
}

export const AddPostActionCreator = () => {
    return {
        type: ADD_POST
    } as const
};
export const ChangeNewPostTextActionCreator = (postText: string) => {
    return {
        type: CHANGE_NEW_POST_TEXT,
        newText: postText
    } as const
};

export default ProfileReducer;