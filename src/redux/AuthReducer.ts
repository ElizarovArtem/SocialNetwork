import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionTypes, AppStateType} from "./redux-store";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA"

export type InitialStateType = {
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
                ...action.payload
            }
        default:
            return state
    }
}

export type SetUserDataType = {
    type: "SET_USER_DATA"
    payload: {
        id: number | null
        email: string | null
        login: string | null
        isAuth: boolean
    }
}
export const setUserDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataType => {
    return {
        type: SET_USER_DATA,
        payload: { id, email, login, isAuth}
    }
}

export type AuthMeThunkType = ThunkAction<void, AppStateType, {}, ActionTypes>
export const authMeThunk = (): AuthMeThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: () => AppStateType) => {
          const data = await authAPI.authMe()
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data
                    dispatch(setUserDataAC(id, email, login, true))
                }

    }
}

export type LogInThunkType =
    ThunkAction<void,
        AppStateType,
        { email: string, password: string, rememberMe: boolean },
        ActionTypes>
export const logInThunk = (email: string, password: string, rememberMe: boolean): LogInThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, {}, any>, getState: () => AppStateType) => {

        authAPI.logIn(email, password, rememberMe)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(authMeThunk())
                } else {
                    let message = res.data.messages.length > 0 ? res.data.messages[0] : "Some error"
                    dispatch(stopSubmit("login", {_error: message}))
                }
            })
    }
}

export type LogOutThunkType =
    ThunkAction<void,
        AppStateType,
        {},
        ActionTypes>
export const logOutThunk = (): LogOutThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: () => AppStateType) => {

        authAPI.logOut()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setUserDataAC(null, null, null, false))
                }
            })
    }
}