import {ActionTypes, messagePageType} from "./state";
import {MessagePropsType} from "../Components/Dialogs/Message/Message";

export type ChangeNewMessageBodyType = ReturnType<typeof ChangeNewMessageBodyCreator>
export type AddNewMessageType = ReturnType<typeof AddNewMessageCreator>

const CHANGE_NEW_MESSAGE_BODY = "CHANGE-NEW-MESSAGE-BODY"
const ADD_NEW_MESSAGE = "ADD-NEW-MESSAGE"

const DialogsReducer = (state: messagePageType, action: ActionTypes) => {
    switch (action.type) {
        case CHANGE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        case ADD_NEW_MESSAGE:
            let newMessage: MessagePropsType = {id: 6, message: state.newMessageBody, owner: "first"};
            state.messages.push(newMessage);
            state.newMessageBody = "";
            return state;
        default:
            return state;
    }
}

const ChangeNewMessageBodyCreator = (body: string) => {
    return {
        type: CHANGE_NEW_MESSAGE_BODY,
        body: body
    } as const
};
const AddNewMessageCreator = () => {
    return {
        type: ADD_NEW_MESSAGE
    } as const
};

export default DialogsReducer;