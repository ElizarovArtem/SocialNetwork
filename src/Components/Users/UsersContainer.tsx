import React from 'react';
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {ActionTypes} from "../../redux/state";
import {UserType} from "../../redux/UsersReducer";

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users
    }
}

type MapStateToPropsType = {
    users: Array<UserType>
}

let MapDispatchToProps = (dispatch: (action: ActionTypes) => void): MapDispatchToPropsType => {
    return {
        follow: (userID: number) => {
            dispatch({type: "FOLLOW", userID: userID})
        },
        unfollow: (userID: number) => {
            dispatch({type: "UNFOLLOW", userID: userID})
        },
        setUsers: (users: Array<UserType>) => {
            dispatch({type: "SET-USERS", user: users})
        }
    }
}

type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
}

export const UsersContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, MapDispatchToProps)(Users)