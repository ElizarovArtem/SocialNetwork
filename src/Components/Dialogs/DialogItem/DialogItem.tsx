import React from 'react';
import s from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import {DialogItemPropsType} from "../../../redux/MessageReducer";

 export function DialogItem(props: DialogItemPropsType) {
    return (
        <div className={s.dialog}>
            <NavLink to={"/dialogs/" + props.id} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    )
}
