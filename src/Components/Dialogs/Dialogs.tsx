import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from "./Dialogs.module.css";
import {DialogItem, DialogItemPropsType} from './DialogItem/DialogItem';
import {Message, MessagePropsType} from "./Message/Message";
import {storeType} from "../../redux/state";

type DialogsPropsType = {
    dialogsState: DialogsStateType
    store: storeType
}
type DialogsStateType = {
    dialogs: Array<DialogItemPropsType>
    messages: Array<MessagePropsType>
}

export function Dialogs(props: DialogsPropsType) {

    const state = props.store.getState().messagesPage

    let dialogsElements = props.dialogsState.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
    let messagesElements = props.dialogsState.messages.map(message => <Message id={message.id} owner={message.owner}
                                                                               message={message.message}/>);

    const onChangeNewMessageBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        props.store.dispatch({type: "CHANGE-NEW-MESSAGE-BODY", body: body});
    }
    const onSendMessageClick = () => {
        props.store.dispatch({type: "ADD-NEW-MESSAGE"})
    };
    const onSendMessageKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === "Enter" || e.ctrlKey){
            props.store.dispatch({type: "ADD-NEW-MESSAGE"})
        }
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div className={s.newMessageArea}>
                    <textarea className={s.messageArea} value={state.newMessageBody} onKeyPress={onSendMessageKeyPress} onChange={onChangeNewMessageBody}></textarea>
                    <button className={s.submitButton} onClick={onSendMessageClick}>Submit</button>
                </div>
            </div>
        </div>
    );
}