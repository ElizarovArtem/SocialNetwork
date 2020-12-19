import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionTypes, AppStateType} from "./redux-store";
import {authAPI, LogInSettingsType} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA"

type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
const initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

export type SetUserDataType = {
    type: "SET_USER_DATA"
    data: {
        id: number
        email: string
        login: string
    }
}
export const setUserDataAC = (id: number, email: string, login: string): SetUserDataType => {
    return {
        type: SET_USER_DATA,
        data: {
            id,
            email,
            login
        }
    }
}

export type AuthMeThunkType = ThunkAction<void, AppStateType, {}, ActionTypes>
export const authMeThunk = (): AuthMeThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: () => AppStateType) => {
        authAPI.authMe().then(data => {
            if (data.resultCode === 0) {
                let {id, login, email} = data.data
                dispatch(setUserDataAC(id, email, login))
            }
        })
    }
}

export type LogInThunkType = ThunkAction<void, AppStateType, { email: string, password: string, rememberMe: boolean }, ActionTypes>
export const logInThunk = (email: string, password: string, rememberMe: boolean): LogInThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: () => AppStateType) => {

        authAPI.logIn(email, password, rememberMe)
            .then(res => {
                authMeThunk()
            })
    }
}