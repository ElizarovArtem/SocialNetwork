import React from 'react';
import s from "./../Dialogs.module.css";
import userAva from './../../../assets/images/userAvajpg.jpg'

export type MessagePropsType = {
    id: number
    message: string
    owner: "first" | "second"
}

export function Message(props: MessagePropsType) {
    return props.owner === "first" ?
        <div className={s.messageItem1}>
            <img src={userAva}/>
            <div className={s.message}>
                {props.message}
            </div>
        </div>
     :
        <div className={s.messageItem2}>
            <div className={s.message}>
                {props.message}
            </div>
            <img src={userAva}/>
        </div>
}
