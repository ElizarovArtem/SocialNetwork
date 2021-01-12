import {ActionTypes} from "./redux-store";

export type MessageType = {
    id: number
    message: string
    owner: "first" | "second"
}
export type DialogItemType = {
    name: string
    id: string
}

export type AddNewMessageType = ReturnType<typeof AddNewMessageAC>

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
    ]
}

export type InitialStateType = {
    dialogs: Array<DialogItemType>,
    messages: Array<MessageType>
}

const MessageReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_NEW_MESSAGE: {
            if (action.newMessage !== ''){
                return {
                    ...state,
                    messages: [...state.messages, {id: 6, message: action.newMessage, owner: "first"}]
                }
            }
            return state
        }
        default:
            return state;
    }
}

export const AddNewMessageAC = (newMessage: string) => {
    return {
        type: ADD_NEW_MESSAGE,
        newMessage
    } as const
};

export default MessageReducer;