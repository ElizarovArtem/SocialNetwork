import {ActionTypes, AppStateType} from "./redux-store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {profileAPI, usersAPI} from "../api/api";

export type AddPostActionType = ReturnType<typeof AddPostActionCreator>

const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET-USER-PROFILE"
const SET_STATUS = "SET_STATUS"
const SET_USER_PHOTO = "SET-USER-PHOTO"

let initialState: InitialStateType = {
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
    profile: null | ProfileType
    status: string
}
export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
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
            let newPost: PostType = {id: 5, message: action.newPostText, likesCount: 0};
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }
        case "SET-USER-PROFILE": {
            return {...state, profile: action.profile}
        }
        case "SET_STATUS": {
            return {...state, status: action.status}
        }
        case "SET-USER-PHOTO": {
            return {...state, profile: {...state.profile, photos: {...action.photoFile}} as ProfileType }
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
    return {
        type: SET_STATUS,
        status
    }
}

export const AddPostActionCreator = (newPostText: string) => {
    return {
        type: ADD_POST,
        newPostText
    } as const
};

export type SetUSerProfileType = {
    type: "SET-USER-PROFILE"
    profile: ProfileType
}
export const setUserProfileAC = (profile: ProfileType): SetUSerProfileType => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
};
export type SetUserPhotoType = {
    type: "SET-USER-PHOTO"
    photoFile: {
        small: string, large: string
    }
}
export const setUserPhotoAC = (photoFile: {small: string, large: string}): SetUserPhotoType => {
    return {
        type: SET_USER_PHOTO,
        photoFile
    }
};

export type SetUserProfileThunkType = ThunkAction<void, AppStateType, { userId: string }, ActionTypes>
export const setUserProfileThunk = (userId: string): SetUserProfileThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: () => AppStateType) => {
        const data = await usersAPI.openUserProfile(userId)
        dispatch(setUserProfileAC(data.data))
    }
}

export type SetStatusThunkType = ThunkAction<void, AppStateType, { userId: string }, ActionTypes>
export const setStatusThunk = (userId: string): SetStatusThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: () => AppStateType) => {
        const data = await profileAPI.getStatus(userId)
        dispatch(setStatusAC(data.data))
    }
}
export type UpdateStatusThunkType = ThunkAction<void, AppStateType, { status: string }, ActionTypes>
export const updateStatusThunk = (status: string): UpdateStatusThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: () => AppStateType) => {
        const data = await profileAPI.updateStatus(status)
        if (data.data.resultCode === 0) {
            dispatch(setStatusAC(status))
        }
    }
}
export type UpdatePhotoThunkType = ThunkAction<void, AppStateType, { photoFile: string }, ActionTypes>
export const updatePhotoThunk = (photoFile: File ): UpdatePhotoThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: () => AppStateType) => {

        const res = await profileAPI.updatePhoto(photoFile)
        if (res.data.resultCode === 0) {
            dispatch(setUserPhotoAC(res.data.data.photos))
        }
    }
}

export default ProfileReducer;