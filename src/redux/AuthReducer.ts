import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionTypes, AppStateType} from "./redux-store";
import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA"
const SET_CAPTCHA_URL = "SET-CAPTCHA-URL"

export type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captcha: string | null
}
const initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
}

export const authReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "SET_USER_DATA":
        case "SET-CAPTCHA-URL":
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
        payload: {id, email, login, isAuth}
    }
}

export type SetCaptchaUrlType = {
    type: "SET-CAPTCHA-URL"
    payload: {
        captcha: string
    }
}
export const setCaptchaUrlAC = (captcha: string): SetCaptchaUrlType => {
    return {
        type: SET_CAPTCHA_URL,
        payload: {captcha}
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
        { email: string, password: string, rememberMe: boolean, captcha: string },
        ActionTypes>
export const logInThunk = (email: string, password: string, rememberMe: boolean, captcha: string): LogInThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, {}, ActionTypes>, getState: () => AppStateType) => {
        authAPI.logIn(email, password, rememberMe, captcha)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(authMeThunk())
                } else {
                    if (res.data.resultCode === 10) {
                        securityAPI.getCaptcha()
                            .then(res => {
                                dispatch(setCaptchaUrlAC(res.data.url))
                            })
                    }
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