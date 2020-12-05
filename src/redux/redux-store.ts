import {applyMiddleware, combineReducers, createStore} from "redux";
import MessageReducer, {AddNewMessageType, ChangeNewMessageBodyType} from "./MessageReducer";
import ProfileReducer, {AddPostActionType, ChangeNewPostTextActionType, SetUSerProfileType} from "./ProfileReducer";
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

let reducers = combineReducers({
    messagesPage: MessageReducer,
    profilePage: ProfileReducer,
    sidebar: SidebarReducer,
    usersPage: UsersReducer,
    auth: authReducer
})

export type AppStateType = ReturnType<typeof reducers>

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

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
    |SetUserDataType