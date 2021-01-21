import React from 'react';
import {UserType} from "../../redux/UsersReducer";
import s from './users.module.css';
import userPhoto from '../../assets/images/user-profile.png'
import {NavLink} from "react-router-dom";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";


export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    onPageChange: (newPage: number) => void
    followingUsers: number[]
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
}

export function Users(props: UsersPropsType) {

    return (
        <div>
            <Paginator totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       onPageChange={props.onPageChange}
                       portionSize={10}
                       currentPage={props.currentPage}
            />
            <div className={s.usersList}>
                {props.users.map(u => <User
                    key={u.id}
                    user={u}
                    followingUsers={props.followingUsers}
                    followThunk={props.followThunk}
                    unfollowThunk={props.unfollowThunk}
                />)}
            </div>
        </div>
    )

}


