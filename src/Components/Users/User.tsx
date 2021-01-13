import React from 'react';
import s from './users.module.css';
import userPhoto from '../../assets/images/user-profile.png'
import {NavLink} from "react-router-dom";
import {UserType} from "../../redux/UsersReducer";


export type UserPropsType = {
    user: UserType
    followingUsers: number[]
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
}

export function User({user, ...props}: UserPropsType) {

    return (
        <div className={s.user}>
            <div className={s.picAndButton}>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img className={s.photo}
                             src={user.photos.small !== null ? user.photos.small : userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button
                            disabled={props.followingUsers.find(n => n === user.id) ? true : false}
                            onClick={() => {
                                props.unfollowThunk(user.id)
                            }}>Unfollow</button> :
                        <button
                            disabled={props.followingUsers.find(n => n === user.id) ? true : false}
                            onClick={() => {
                                props.followThunk(user.id)
                            }}>Follow</button>
                    }
                </div>
            </div>
            <div className={s.mainInfo}>
                <div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </div>
            </div>
        </div>
    )
}


