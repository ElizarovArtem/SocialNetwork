import React from 'react';
import {UserType} from "../../redux/UsersReducer";
import s from './users.module.css';
import axios from 'axios';
import userPhoto from '../../assets/images/user-profile.png'


type UsersPropsType = {
    users: Array<UserType>
    follow: (id: number) => void
    unfollow: (id: number) => void
    setUsers: (users: Array<UserType>) => void
}


export class Users extends React.Component<UsersPropsType, { }> {
    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return(
            <div>
                {this.props.users.map(u => {
                    return (
                        <div>
                            <div>
                                <div>
                                    <img className={s.photo} src={u.photos.small !== null ? u.photos.small : userPhoto}/>
                                </div>
                                <div>
                                    {u.followed ?
                                        <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button> :
                                        <button onClick={() => this.props.follow(u.id)}>Follow</button>
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
}


/*
export function Users (props: UsersPropsType) {

    if(props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                props.setUsers(response.data.items)
            })
    }

    return(
        <div>
            {props.users.map(u => {
                return (
                    <div>
                        <div>
                            <div>
                                <img className={s.photo} src={u.photos.small != null ? u.photos.small : userPhoto}/>
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
*/


