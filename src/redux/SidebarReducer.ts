import {ActionTypes, SidebarPageType} from "./state";

export type FriendsPropsType = {
    name: string
}

let initialState:InitialStateType = {
    friends:[
        {name: "Kolya"},
        {name: "Misha"},
        {name: "Misha"},
        {name: "Misha"},
        {name: "Natan"},
        {name: "Natan"}
        ]
}

type InitialStateType = {
    friends: Array<FriendsPropsType>
}

const SidebarReducer = (state: InitialStateType = initialState, action: ActionTypes):InitialStateType => {


    return state;
}

export default SidebarReducer;