import React from 'react';
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";


type HeaderPropsType = {
    login: string | null
    isAuth: boolean
}

export function Header(props: HeaderPropsType) {
    return (
        <header className={s.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png"/>
            <div className={s.auth}>
                {props.isAuth ?
                    props.login
                    :
                    <NavLink to={"/auth"} >Login</NavLink>
                }
            </div>
        </header>
    );
}