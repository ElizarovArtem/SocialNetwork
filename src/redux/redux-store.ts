import {combineReducers, createStore} from "redux";
import MessageReducer from "./MessageReducer";
import ProfileReducer from "./ProfileReducer";
import SidebarReducer from "./SidebarReducer";

let reducers = combineReducers({
    messagesPage: MessageReducer,
    profilePage: ProfileReducer,
    sidebar: SidebarReducer
})

export type AppStateType = ReturnType<typeof reducers>

let store = createStore(reducers)

export default store;