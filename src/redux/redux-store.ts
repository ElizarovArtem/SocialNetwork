import {applyMiddleware, combineReducers, createStore} from "redux";
import MessageReducer, {AddNewMessageType} from "./MessageReducer";
import ProfileReducer, {
    AddPostActionType,
    SetStatusType, SetUserPhotoType,
    SetUSerProfileType, UpdateProfileType
} from "./ProfileReducer";
import SidebarReducer from "./SidebarReducer";
import UsersReducer, {
    ChangeCurrentPageType,
    ChangeTotalUsersCountType, FakeType,
    FollowACType,
    SetUsersACType, ToggleFollowingProgressType, ToggleIsFetchingType,
    UnfollowACType
} from "./UsersReducer";
import {authReducer, SetUserDataType} from "./AuthReducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from 'redux-form';
import {appReducer, SetInitializedType} from "./AppReducer";


let reducers = combineReducers({
    messagesPage: MessageReducer,
    profilePage: ProfileReducer,
    sidebar: SidebarReducer,
    usersPage: UsersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type AppStateType = ReturnType<typeof reducers>

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store

export default store;

export type ActionTypes = AddPostActionType
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
    | SetInitializedType
    | FakeType
    | SetUserPhotoType
    | UpdateProfileType