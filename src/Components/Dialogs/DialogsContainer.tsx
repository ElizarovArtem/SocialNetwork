import React from 'react';
import {Dialogs} from "./Dialogs";
import StoreContext from "../../StoreContext";

type DialogsPropsType = {}

export function DialogsContainer(props: DialogsPropsType) {
    return (
        <StoreContext.Consumer>
            {
            (store) => {
                const state = store.getState().messagesPage

                const onChangeNewMessageBody = (text: string) => {
                    store.dispatch({type: "CHANGE-NEW-MESSAGE-BODY", body: text});
                }
                const onSendMessageClick = () => {
                    store.dispatch({type: "ADD-NEW-MESSAGE"})
                };
                const onSendMessageKeyPress = () => {
                    store.dispatch({type: "ADD-NEW-MESSAGE"})
                }

                return (
                    <Dialogs messages={state.messages}
                             dialogs={state.dialogs}
                             newMessageBody={state.newMessageBody}
                             onChangeNewMessageBody={onChangeNewMessageBody}
                             onSendMessage={onSendMessageClick}
                             onSendMessageKeyPress={onSendMessageKeyPress}
                    />
                )
            }
        }
        </StoreContext.Consumer>
    )
}