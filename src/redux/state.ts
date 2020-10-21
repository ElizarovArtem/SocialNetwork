import {DialogItemPropsType} from "../Components/Dialogs/DialogItem/DialogItem";
import {MessagePropsType} from "../Components/Dialogs/Message/Message";
import {PostType} from "../Components/Profile/My posts/Post/Post";
import {FriendsPropsType} from "../Components/Navbar/Friends/Friend";
import ProfileReducer, {AddPostActionType, ChangeNewPostTextActionType} from "./ProfileReducer";
import DialogsReducer, {AddNewMessageType, ChangeNewMessageBodyType} from "./DialogsReducer";
import SidebarReducer from "./SidebarReducer";


export type RootStateType = {
    messagesPage: messagePageType
    profilePage: profilePageType
    sidebar: sidebarPageType
};
export type messagePageType = {
    dialogs: Array<DialogItemPropsType>
    messages: Array<MessagePropsType>
    newMessageBody: string
};
export type profilePageType = {
    posts: Array<PostType>
    newPostText: string
};
export type sidebarPageType = {
    friends: Array<FriendsPropsType>
};
export type storeType = {
    _state: RootStateType
    getState: () => RootStateType
    subscribe: (observer: (state: RootStateType) => void) => void
    _callSubscriber: (state: RootStateType) => void
    dispatch: (action: ActionTypes) => void
}

export type ActionTypes = AddPostActionType | ChangeNewPostTextActionType | ChangeNewMessageBodyType | AddNewMessageType

export let store: storeType = {
    _state: <RootStateType>{
        messagesPage: <messagePageType>{
            dialogs: <Array<DialogItemPropsType>>[
                {id: "1", name: "Ilya"},
                {id: "2", name: "Andrey"},
                {id: "3", name: "Igor"},
            ],
            messages: <Array<MessagePropsType>>[
                {id: 1, message: "Hello", owner: "first"},
                {id: 2, message: "Lets have a dinner together today", owner: "first"},
                {id: 3, message: "Lets go", owner: "second"},
                {id: 4, message: "Lets go", owner: "second"},
                {id: 5, message: "Lets go", owner: "first"},
            ],
            newMessageBody: ""
        },
        profilePage: <profilePageType>{
            newPostText: "it-kamasutra",
            posts: <Array<PostType>>[
                {id: 1, message: "Hello everybody", likesCount: 23},
                {id: 2, message: "Who want's to go for a walk?", likesCount: 12},
                {id: 2, message: "Go alone, idioto", likesCount: 12},
            ]
        },
        sidebar: <sidebarPageType>{
            friends: <Array<FriendsPropsType>>[
                {name: "Kolya"},
                {name: "Misha"},
                {name: "Misha"},
                {name: "Misha"},
                {name: "Natan"},
                {name: "Natan"}
            ]
        }
    },
    _callSubscriber(state: RootStateType) {
        console.log("good")
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action: ActionTypes) {

        this._state.profilePage = ProfileReducer(this._state.profilePage, action);
        this._state.messagesPage = DialogsReducer(this._state.messagesPage, action);
        this._state.sidebar = SidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);

    }
};




