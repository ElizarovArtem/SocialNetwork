import React from 'react';
import {UserType} from "../../redux/UsersReducer";
import s from './users.module.css';
import userPhoto from '../../assets/images/user-profile.png'
import {NavLink} from "react-router-dom";
import {followingAPI} from "../../api/api";


export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    follow: (id: number) => void
    unfollow: (id: number) => void
    onPageChange: (newPage: number) => void
}


export function Users (props: UsersPropsType) {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++){
        pages.push(i);
    }

    return(
        <div>
            <div className={s.pages}>
                {pages.map(p => {
                    return <span
                        onClick={() => props.onPageChange(p)}
                        className={p === props.currentPage ? s.selectedPage : s.page}>{p}</span>
                })}
            </div>
            {props.users.map(u => {
                return (
                    <div>
                        <div>
                            <div>
                                <NavLink to={'/profile/' + u.id}>
                                <img className={s.photo} src={u.photos.small !== null ? u.photos.small : userPhoto}/>
                                </NavLink>
                            </div>
                            <div>
                                {u.followed ?
                                    <button onClick={() => {
                                        followingAPI.unfollow(u.id).then(data => {
                                                if(data.resultCode == 0){
                                                    props.unfollow(u.id)
                                                }
                                            })
                                    }}>Unfollow</button> :
                                    <button onClick={() => {
                                        followingAPI.follow(u.id).then(data => {
                                                if(data.resultCode == 0){
                                                    props.follow(u.id)
                                                }
                                            })
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


