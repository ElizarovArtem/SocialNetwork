import React from 'react';
import s from "./Dialogs.module.css";
import {DialogItem, DialogItemPropsType} from './DialogItem/DialogItem';
import {Message, MessagePropsType} from "./Message/Message";

type DialogsPropsType = {
    dialogsState: DialogsStateType
}
type DialogsStateType = {
    dialogs: Array<DialogItemPropsType>
    messages: Array<MessagePropsType>
}

export function Dialogs(props: DialogsPropsType) {

    let dialogsElements = props.dialogsState.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);

    let messagesElements = props.dialogsState.messages.map(message => <Message owner={message.owner}
                                                                               message={message.message}/>);

    let messageAreaRef = React.createRef<HTMLTextAreaElement>();
    let sendMessage = () => {
        let text = messageAreaRef.current && messageAreaRef.current.value;
        alert(text);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div className={s.newMessageArea}>
                    <textarea className={s.messageArea} ref={messageAreaRef}></textarea>
                    <button className={s.submitButton} onClick={sendMessage}>Submit</button>
                </div>
            </div>
        </div>
    );
}