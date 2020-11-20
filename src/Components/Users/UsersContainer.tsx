import React from 'react';
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {ActionTypes} from "../../redux/state";
import {changeCurrentPageAC, changeTotalUsersCountAC, UserType} from "../../redux/UsersReducer";
import axios from "axios";

type UsersContainerPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    follow: (id: number) => void
    unfollow: (id: number) => void
    changeCurrentPage: (newPage: number) => void
    setUsers: (users: Array<UserType>) => void
    changeTotalUsersCount: (newTotalUsersCount: number) => void
}

export class UsersContainer extends React.Component<UsersContainerPropsType, {}> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=1&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.changeTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChange = (newPage: number) => {
        debugger
        this.props.changeCurrentPage(newPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${newPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <Users
            users={this.props.users}
            currentPage={this.props.currentPage}
            pageSize={this.props.pageSize}
            onPageChange={this.onPageChange}
            totalUsersCount={this.props.totalUsersCount}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
        />
    }
}

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

export const UserBigContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, MapDispatchToProps)(UsersContainer)