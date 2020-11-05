import ProfileReducer, {AddPostActionType, ChangeNewPostTextActionType, PostType} from "./ProfileReducer";
import MessageReducer, {
    AddNewMessageType,
    ChangeNewMessageBodyType,
    DialogItemType,
    MessageType
} from "./MessageReducer";
import SidebarReducer, {FriendsPropsType} from "./SidebarReducer";


export type RootStateType = {
    messagesPage: MessagePageType
    profilePage: ProfilePageType
    sidebar: SidebarPageType
};
export type MessagePageType = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageType>
    newMessageBody: string
};
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
};
export type SidebarPageType = {
    friends: Array<FriendsPropsType>
};
export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    subscribe: (observer: (state: RootStateType) => void) => void
    _callSubscriber: (state: RootStateType) => void
    dispatch: (action: ActionTypes) => void
}

export type ActionTypes = AddPostActionType | ChangeNewPostTextActionType | ChangeNewMessageBodyType | AddNewMessageType

export let store: StoreType = {
    _state: {
        messagesPage: {
            dialogs: [
                {id: "1", name: "Ilya"},
                {id: "2", name: "Andrey"},
                {id: "3", name: "Igor"},
            ],
            messages:[
                {id: 1, message: "Hello", owner: "first"},
                {id: 2, message: "Lets have a dinner together today", owner: "first"},
                {id: 3, message: "Lets go", owner: "second"},
                {id: 4, message: "Lets go", owner: "second"},
                {id: 5, message: "Lets go", owner: "first"},
            ],
            newMessageBody: ""
        },
        profilePage: {
            newPostText: "it-kamasutra",
            posts: [
                {id: 1, message: "Hello everybody", likesCount: 23},
                {id: 2, message: "Who want's to go for a walk?", likesCount: 12},
                {id: 2, message: "Go alone, idioto", likesCount: 12},
            ]
        },
        sidebar: {
            friends: [
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
        this._state.messagesPage = MessageReducer(this._state.messagesPage, action);
        this._state.sidebar = SidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);

    }
};




