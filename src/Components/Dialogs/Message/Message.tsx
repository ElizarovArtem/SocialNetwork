import React from 'react';
import s from "./../Dialogs.module.css";


export type MessagePropsType = {
    message: string
    owner: "first"
}

export function Message(props: MessagePropsType) {
    if(props.owner === "first"){
        return (
            <div className={s.messageItem1}>
                <img src="https://www.perunica.ru/uploads/posts/2019-03/1552932077_1.jpg"/>
                <div className={s.message}>
                    {props.message}
                </div>
            </div>
        )
    }else{
        return (
            <div className={s.messageItem2}>
                <div className={s.message}>
                    {props.message}
                </div>
                <img src="https://www.perunica.ru/uploads/posts/2019-03/1552932077_1.jpg"/>
            </div>
        )
    }




}
