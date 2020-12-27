import React from 'react';
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {
    changeCurrentPageAC, changePageThunk,
    changeTotalUsersCountAC, followThunk, getUsersThunk, setUsersAC,
    toggleIsFetchingAC, unfollowThunk,
    UserType
} from "../../redux/UsersReducer";
import {Preloader} from "../common/Preloader/Preloader";
import {
    getUsersSelector,
    selectCurrentPage, selectFollowingUsers,
    selectIsFetching,
    selectPageSize,
    selectTotalUsersCount
} from '../../redux/UsersSecector';


type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

export class UsersContainer extends React.Component<UsersContainerPropsType, {}> {
    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize)
    }

    onPageChange = (newPage: number) => {
        this.props.changePageThunk(newPage, this.props.pageSize)
    }

    render() {
        console.log("RENDER")
        return <>
                {this.props.isFetching ? <Preloader/> : null}
            <Users
                users={this.props.users}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                onPageChange={this.onPageChange}
                totalUsersCount={this.props.totalUsersCount}
                followingUsers={this.props.followingUsers}
                followThunk={this.props.followThunk}
                unfollowThunk={this.props.unfollowThunk}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    console.log("mapStateToProps")
    return {
        users: getUsersSelector(state),
        currentPage: selectCurrentPage(state),
        pageSize: selectPageSize(state),
        totalUsersCount: selectTotalUsersCount(state),
        isFetching: selectIsFetching(state),
        followingUsers: selectFollowingUsers(state)
    }
}

type MapStateToPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingUsers: number[]
}

type MapDispatchToPropsType = {
    setUsersAC: (users: Array<UserType>) => void
    changeCurrentPageAC: (newPage: number) => void
    changeTotalUsersCountAC: (newTotalUsersCount: number) => void
    toggleIsFetchingAC: (isFetching: boolean) => void
    getUsersThunk: (currentPage: number , pageSize: number) => void
    changePageThunk: (newPage: number, pageSize: number) => void
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
}

export const UserBigContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    changeCurrentPageAC,
    changeTotalUsersCountAC,
    setUsersAC,
    toggleIsFetchingAC,
    getUsersThunk,
    changePageThunk,
    followThunk,
    unfollowThunk
})(UsersContainer)