import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from "./Dialogs.module.css";
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from "./Message/Message";
import {DialogItemType, MessageType} from "../../redux/MessageReducer";

type DialogsPropsType = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageType>
    onChangeNewMessageBody: (text: string) => void
    onSendMessage: () => void
    onSendMessageKeyPress: () => void
    newMessageBody: string
}

export function Dialogs(props: DialogsPropsType) {

    let dialogsElements = props.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
    let messagesElements = props.messages.map(message => <Message id={message.id} owner={message.owner}
                                                                               message={message.message}/>);

    const onChangeNewMessageBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value;
        props.onChangeNewMessageBody(body)
    }
    const onSendMessageClick = () => {
        props.onSendMessage()
    };
    const onSendMessageKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === "Enter" || e.ctrlKey){
            props.onSendMessageKeyPress()
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
                    <textarea className={s.messageArea}
                              value={props.newMessageBody}
                              onKeyPress={onSendMessageKeyPress}
                              onChange={onChangeNewMessageBody}>

                    </textarea>
                    <button className={s.submitButton} onClick={onSendMessageClick}>Submit</button>
                </div>
            </div>
        </div>
    );
}