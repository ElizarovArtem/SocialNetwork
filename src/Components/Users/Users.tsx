import React from 'react';
import {UserType} from "../../redux/UsersReducer";
import s from './users.module.css';
import userPhoto from '../../assets/images/user-profile.png'
import {NavLink} from "react-router-dom";


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

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div className={s.pages}>
                {pages.map((p,i) => {
                    return <span key={i}
                        onClick={() => props.onPageChange(p)}
                        className={p === props.currentPage ? s.selectedPage : s.page}>{p}</span>
                })}
            </div>
            {props.users.map(u => {
                return (
                    <div key={u.id}>
                        <div>
                            <div>
                                <NavLink to={'/profile/' + u.id}>
                                    <img className={s.photo}
                                         src={u.photos.small !== null ? u.photos.small : userPhoto}/>
                                </NavLink>
                            </div>
                            <div>
                                {u.followed ?
                                    <button
                                        disabled={props.followingUsers.find(n => n === u.id) ? true : false}
                                        onClick={() => {
                                            props.unfollowThunk(u.id)
                                        }}>Unfollow</button> :
                                    <button
                                        disabled={props.followingUsers.find(n => n === u.id) ? true : false}
                                        onClick={() => {
                                            props.followThunk(u.id)
                                        }}>Follow</button>
                                }
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </div>
                            <div>
                                <div>{"u.location.country"}</div>
                                <div>{"u.location.city"}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )

}


