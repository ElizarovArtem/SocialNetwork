import React from 'react';
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {
    changeCurrentPageAC,
    changeTotalUsersCountAC,
    followAC, setUsersAC,
    toggleIsFetchingAC, unfollowAC,
    UserType
} from "../../redux/UsersReducer";
import axios from "axios";
import {Preloader} from "../common/Preloader/Preloader";



type UsersContainerPropsType = {
    totalUsersCount: number
    isFetching: boolean
    pageSize: number
    currentPage: number
    users: Array<UserType>
    followAC: (id: number) => void
    unfollowAC: (id: number) => void
    changeCurrentPageAC: (newPage: number) => void
    setUsersAC: (users: Array<UserType>) => void
    toggleIsFetchingAC: (isFetching: boolean) => void
    changeTotalUsersCountAC: (newTotalUsersCount: number) => void
}

export class UsersContainer extends React.Component<UsersContainerPropsType, {}> {
    componentDidMount() {
        this.props.toggleIsFetchingAC(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=1&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetchingAC(false)
                this.props.setUsersAC(response.data.items)
                this.props.changeTotalUsersCountAC(response.data.totalCount)
            })
    }

    onPageChange = (newPage: number) => {
        this.props.toggleIsFetchingAC(true)
        this.props.changeCurrentPageAC(newPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${newPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetchingAC(false)
                this.props.setUsersAC(response.data.items)
            })
    }

    render() {
        return <>
                {this.props.isFetching ? <Preloader/> : null}
            <Users
                users={this.props.users}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                onPageChange={this.onPageChange}
                totalUsersCount={this.props.totalUsersCount}
                follow={this.props.followAC}
                unfollow={this.props.unfollowAC}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        isFetching: state.usersPage.isFetching
    }
}

type MapStateToPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
}

/*let MapDispatchToProps = (dispatch: (action: ActionTypes) => void): MapDispatchToPropsType => {
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
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    }
}*/

type MapDispatchToPropsType = {
    followAC: (userID: number) => void
    unfollowAC: (userID: number) => void
    setUsersAC: (users: Array<UserType>) => void
    changeCurrentPageAC: (newPage: number) => void
    changeTotalUsersCountAC: (newTotalUsersCount: number) => void
    toggleIsFetchingAC: (isFetching: boolean) => void
}

export const UserBigContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    changeCurrentPageAC,
    changeTotalUsersCountAC,
    followAC,
    unfollowAC,
    setUsersAC,
    toggleIsFetchingAC
})(UsersContainer)