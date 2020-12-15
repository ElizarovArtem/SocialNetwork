import {ActionTypes, AppStateType} from "./redux-store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {profileAPI, usersAPI} from "../api/api";

export type AddPostActionType = ReturnType<typeof AddPostActionCreator>
export type ChangeNewPostTextActionType = ReturnType<typeof changeNewPostTextActionCreator>

const ADD_POST = "ADD-POST"
const CHANGE_NEW_POST_TEXT = "CHANGE-NEW-POST-TEXT"
const SET_USER_PROFILE = "SET-USER-PROFILE"
const SET_STATUS = "SET_STATUS"

let initialState: InitialStateType = {
    newPostText: "it-kamasutra",
    posts: [
        {id: 1, message: "Hello everybody", likesCount: 23},
        {id: 2, message: "Who want's to go for a walk?", likesCount: 12},
        {id: 2, message: "Go alone", likesCount: 12},
    ],
    profile: null,
    status: ""
}

export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type InitialStateType = {
    posts: Array<PostType>
    newPostText: string
    profile: null | ProfileType
    status: string
}
export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription:string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: (string), large: (string)
    }
}

export const ProfileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
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
        case "SET-USER-PROFILE": {
            return {...state, profile: action.profile}
        }
        case "SET_STATUS":{
            return { ...state, status: action.status}
        }
        default:
            return state;
    }
}

export type SetStatusType = {
    type: "SET_STATUS"
    status: string
}
export const setStatusAC = (status: string): SetStatusType => {
    return{
        type: SET_STATUS,
        status
    }
}

export const AddPostActionCreator = () => {
    return {
        type: ADD_POST
    } as const
};
export const changeNewPostTextActionCreator = (postText: string) => {
    return {
        type: CHANGE_NEW_POST_TEXT,
        newText: postText
    } as const
};

export type SetUSerProfileType = {
    type: "SET-USER-PROFILE"
    profile: ProfileType
}
export const setUSerProfileAC = (profile: ProfileType): SetUSerProfileType => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
};

export type SetUserProfileThunkType = ThunkAction<void, AppStateType, { userId: string } , ActionTypes>
export const setUserProfileThunk = (userId: string): SetUserProfileThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: ()=> AppStateType) => {
        usersAPI.openUserProfile(userId)
            .then(data => {
                dispatch(setUSerProfileAC(data.data))
            })
    }
}

export type SetStatusThunkType = ThunkAction<void, AppStateType, { userId: string } , ActionTypes>
export const setStatusThunk = (userId: string): SetStatusThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: ()=> AppStateType) => {
        profileAPI.getStatus(userId)
            .then(data => {
                debugger
                dispatch(setStatusAC(data.data))
            })
    }
}
export type UpdateStatusThunkType = ThunkAction<void, AppStateType, { status: string } , ActionTypes>
export const updateStatusThunk = (status: string): UpdateStatusThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: ()=> AppStateType) => {
        profileAPI.updateStatus(status)
            .then(data => {
                debugger
                if(data.data.resultCode === 0) {
                    dispatch(setStatusAC(status))
                }
            })
    }
}

export default ProfileReducer;