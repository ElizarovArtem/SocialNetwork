import React from 'react';
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {
    changeCurrentPageAC,
    changeTotalUsersCountAC,
    followAC, setUsersAC, toggleFollowingProgressAC,
    toggleIsFetchingAC, unfollowAC,
    UserType
} from "../../redux/UsersReducer";
import {Preloader} from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";


type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

export class UsersContainer extends React.Component<UsersContainerPropsType, {}> {
    componentDidMount() {
        this.props.toggleIsFetchingAC(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.toggleIsFetchingAC(false)
                this.props.setUsersAC(data.items)
                this.props.changeTotalUsersCountAC(data.totalCount)
            })
    }

    onPageChange = (newPage: number) => {
        this.props.toggleIsFetchingAC(true)
        this.props.changeCurrentPageAC(newPage)
        usersAPI.getUsers(newPage, this.props.pageSize).then(data => {
                this.props.toggleIsFetchingAC(false)
                this.props.setUsersAC(data.items)
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
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                toggleFollowingProgressAC={this.props.toggleFollowingProgressAC}
                followingUsers={this.props.followingUsers}
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
        isFetching: state.usersPage.isFetching,
        toggleFollowingProgress: state.usersPage.toggleFollowingProgress,
        followingUsers: state.usersPage.followingUsers
    }
}

type MapStateToPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    toggleFollowingProgress: boolean
    followingUsers: number[]
}

type MapDispatchToPropsType = {
    followAC: (userID: number) => void
    unfollowAC: (userID: number) => void
    setUsersAC: (users: Array<UserType>) => void
    changeCurrentPageAC: (newPage: number) => void
    changeTotalUsersCountAC: (newTotalUsersCount: number) => void
    toggleIsFetchingAC: (isFetching: boolean) => void
    toggleFollowingProgressAC: (isFollowing: boolean, uId: number) => void

}

export const UserBigContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    changeCurrentPageAC,
    changeTotalUsersCountAC,
    followAC,
    unfollowAC,
    setUsersAC,
    toggleIsFetchingAC,
    toggleFollowingProgressAC
})(UsersContainer)