import React from 'react';
import s from "./Dialogs.module.css";
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from "./Message/Message";
import {MessagePageType} from "../../redux/state";
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

type DialogsPropsType = {
    dialogsState: MessagePageType
    onChangeNewMessageBody: (text: string) => void
    onSendMessage: (newMessage: string) => void
    onSendMessageKeyPress: () => void
    isAuth: boolean
}

export function Dialogs(props: DialogsPropsType) {

    let dialogsElements = props.dialogsState.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
    let messagesElements = props.dialogsState.messages.map(message => <Message id={message.id} owner={message.owner}
                                                                               message={message.message}/>);

    const onSendMessageClick = (data: MessageFieldDataType) => {
        props.onSendMessage(data.newMessageBody)
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
               <ReduxMessageField onSubmit={onSendMessageClick}/>
            </div>
        </div>
    );
}


type MessageFieldDataType = {
    newMessageBody: string
}


export const MessageField = (props: InjectedFormProps<MessageFieldDataType>) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <Field className={s.messageArea}
                   component={Textarea}
                   validate={[]}
                   name={"newMessageBody"}
                   placeholder={"Add new message"}
            />
            <button className={s.submitButton}>Submit</button>
        </form>
    )
}

export const ReduxMessageField = reduxForm<MessageFieldDataType>({form: "messageArea"})(MessageField)