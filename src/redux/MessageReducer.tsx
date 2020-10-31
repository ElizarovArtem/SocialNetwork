import {ActionTypes, messagePageType} from "./state";

export type MessagePropsType = {
    id: number
    message: string
    owner: "first" | "second"
}
export type DialogItemPropsType = {
    name: string
    id: string
}

export type ChangeNewMessageBodyType = ReturnType<typeof ChangeNewMessageBodyCreator>
export type AddNewMessageType = ReturnType<typeof AddNewMessageCreator>

const CHANGE_NEW_MESSAGE_BODY = "CHANGE-NEW-MESSAGE-BODY"
const ADD_NEW_MESSAGE = "ADD-NEW-MESSAGE"



let initialState: InitialStateType = {
    dialogs: [
        {id: "1", name: "Ilya"},
        {id: "2", name: "Andrey"},
        {id: "3", name: "Igor"},
    ],
    messages: [
        {id: 1, message: "Hello", owner: "first"},
        {id: 2, message: "Lets have a dinner together today", owner: "first"},
        {id: 3, message: "Lets go", owner: "second"},
        {id: 4, message: "Lets go", owner: "second"},
        {id: 5, message: "Lets go", owner: "first"},
    ],
    newMessageBody: ""
}

type InitialStateType = {
    dialogs: Array<DialogItemPropsType>,
    messages: Array<MessagePropsType>,
    newMessageBody: string
}

const MessageReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
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

export default MessageReducer;