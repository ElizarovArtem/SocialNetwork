import React from 'react';
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {ActionTypes} from "../../redux/state";
import {changeCurrentPageAC, changeTotalUsersCountAC, UserType} from "../../redux/UsersReducer";

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
    }
}

type MapStateToPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
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
            dispatch({type: "SET-USERS", users: users})
        },
        changeCurrentPage: (newPage: number) => {
            dispatch(changeCurrentPageAC(newPage))
        },
        changeTotalUsersCount: (newTotalUsersCount: number) => {
            dispatch(changeTotalUsersCountAC(newTotalUsersCount))
        }
    }
}

type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    changeCurrentPage: (newPage: number) => void
    changeTotalUsersCount: (newTotalUsersCount: number) => void
}

export const UsersContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, MapDispatchToProps)(Users)