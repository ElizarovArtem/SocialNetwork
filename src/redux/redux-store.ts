import {applyMiddleware, combineReducers, createStore} from "redux";
import MessageReducer, {AddNewMessageType, ChangeNewMessageBodyType} from "./MessageReducer";
import ProfileReducer, {
    AddPostActionType,
    ChangeNewPostTextActionType,
    SetStatusType,
    SetUSerProfileType
} from "./ProfileReducer";
import SidebarReducer from "./SidebarReducer";
import UsersReducer, {
    ChangeCurrentPageType,
    ChangeTotalUsersCountType,
    FollowACType,
    SetUsersACType, ToggleFollowingProgressType, ToggleIsFetchingType,
    UnfollowACType
} from "./UsersReducer";
import {authReducer, SetUserDataType} from "./AuthReducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form';


let reducers = combineReducers({
    messagesPage: MessageReducer,
    profilePage: ProfileReducer,
    sidebar: SidebarReducer,
    usersPage: UsersReducer,
    auth: authReducer,
    form: formReducer
})

export type AppStateType = ReturnType<typeof reducers>

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store

export default store;

export type ActionTypes = AddPostActionType
    | ChangeNewPostTextActionType
    | ChangeNewMessageBodyType
    | AddNewMessageType
    | FollowACType
    | UnfollowACType
    | SetUsersACType
    | ChangeCurrentPageType
    | ChangeTotalUsersCountType
    | ToggleIsFetchingType
    | SetUSerProfileType
    | ToggleFollowingProgressType
    | SetUserDataType
    | SetStatusType