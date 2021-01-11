import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionTypes, AppStateType} from "./redux-store";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {authMeThunk} from "./AuthReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"

export type InitialStateType = {
    initialized: boolean
}
const initialState: InitialStateType = {
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export type SetInitializedType = {
    type: "INITIALIZED_SUCCESS"
}
export const setAppInitializedAC = (): SetInitializedType => {
    return {type: INITIALIZED_SUCCESS }
}

export type InitializedAppTC = ThunkAction<void, AppStateType, {}, ActionTypes>
export const initializedThunk = () => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, any>, getState: () => AppStateType) => {
        let promise = dispatch(authMeThunk())
        Promise.all([promise]).then(() => {
            dispatch(setAppInitializedAC())
        })
    }
}

