import React from 'react';
import {UserType} from "../../redux/UsersReducer";
import s from './users.module.css';

type UsersPropsType = {
    users: Array<UserType>
    follow: (id: number) => void
    unfollow: (id: number) => void
    setUsers: (users: Array<UserType>) => void
}

export function Users (props: UsersPropsType) {

    if(props.users.length === 0) {
        props.setUsers([
                {
                    id: 1,
                    avatarURL: "https://upload.wikimedia.org/wikipedia/commons/8/80/James_McAvoy_by_Gage_Skidmore_2.jpg",
                    followed: true,
                    fullName: "James",
                    status: "Filth - good film",
                    location: {city: "London", country: "England"}
                },
                {
                    id: 2,
                    avatarURL: "https://upload.wikimedia.org/wikipedia/commons/8/80/James_McAvoy_by_Gage_Skidmore_2.jpg",
                    followed: false,
                    fullName: "Mike",
                    status: "Filth - nice film",
                    location: {city: "London", country: "England"}
                },
                {
                    id: 3,
                    avatarURL: "https://upload.wikimedia.org/wikipedia/commons/8/80/James_McAvoy_by_Gage_Skidmore_2.jpg",
                    followed: true,
                    fullName: "James",
                    status: "Filth - not good film",
                    location: {city: "London", country: "England"}
                }
        ])
    }

    return(
        <div>
            {props.users.map(u => {
                return (
                    <div>
                        <div>
                            <div>
                                <img className={s.photo} src={u.avatarURL}/>
                            </div>
                            <div>
                                {u.followed ?
                                    <button onClick={() => props.unfollow(u.id)}>Unfollow</button> :
                                    <button onClick={() => props.follow(u.id)}>Follow</button>
                                }

                            </div>
                        </div>
                        <div>
                            <div>
                                <div>{u.fullName}</div>
                                <div>{u.status}</div>
                            </div>
                            <div>
                                <div>{u.location.country}</div>
                                <div>{u.location.city}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}