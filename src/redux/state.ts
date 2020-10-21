import {DialogItemPropsType} from "../Components/Dialogs/DialogItem/DialogItem";
import {MessagePropsType} from "../Components/Dialogs/Message/Message";
import {PostType} from "../Components/Profile/My posts/Post/Post";
import {FriendsPropsType} from "../Components/Navbar/Friends/Friend";


export type RootStateType = {
    messagesPage: messagePageType
    profilePage: profilePageType
    sidebar: sidebarPageType
};
type messagePageType = {
    dialogs: Array<DialogItemPropsType>
    messages: Array<MessagePropsType>
    newMessageBody: string
};
type profilePageType = {
    posts: Array<PostType>
    newPostText: string
};
type sidebarPageType = {
    friends: Array<FriendsPropsType>
};
export type storeType = {
    _state: RootStateType
    getState: () => RootStateType
    subscribe: (observer: (state: RootStateType) => void) => void
    _callSubscriber: (state: RootStateType) => void
    dispatch: (action: ActionTypes) => void
}

type AddPostActionType = ReturnType<typeof AddPostActionCreator>
type ChangeNewPostTextActionType = ReturnType<typeof ChangeNewPostTextActionCreator>
type ChangeNewMessageBodyType = ReturnType<typeof ChangeNewMessageBodyCreator>
type AddNewMessageType = ReturnType<typeof AddNewMessageCreator>
export type ActionTypes = AddPostActionType | ChangeNewPostTextActionType | ChangeNewMessageBodyType | AddNewMessageType

const ADD_POST = "ADD-POST"
const CHANGE_NEW_POST_TEXT = "CHANGE-NEW-POST-TEXT"
const CHANGE_NEW_MESSAGE_BODY = "CHANGE-NEW-MESSAGE-BODY"
const ADD_NEW_MESSAGE = "ADD-NEW-MESSAGE"

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
        if (action.type === "ADD-POST") {
            let newPost: PostType = {id: 5, message: this._state.profilePage.newPostText, likesCount: 0};
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = "";
            this._callSubscriber(this._state);
        } else if (action.type === "CHANGE-NEW-POST-TEXT") {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }else if(action.type === CHANGE_NEW_MESSAGE_BODY){
            this._state.messagesPage.newMessageBody = action.body;
            this._callSubscriber(this._state);
        }else if(action.type === ADD_NEW_MESSAGE){
            let newMessage: MessagePropsType = {id: 6, message: this._state.messagesPage.newMessageBody, owner: "first"};
            this._state.messagesPage.messages.push(newMessage);
            this._state.messagesPage.newMessageBody = "";
            this._callSubscriber(this._state);
        }


    }
};
const AddPostActionCreator = () => {
    return {
        type: ADD_POST
    } as const
};
const ChangeNewPostTextActionCreator = (postText: string) => {
    return {
        type: CHANGE_NEW_POST_TEXT,
        newText: postText
    } as const
};
const ChangeNewMessageBodyCreator = (body: string) => {
    return {
        type: CHANGE_NEW_MESSAGE_BODY,
        body: body
    }as const
};
const AddNewMessageCreator = () => {
    return {
        type: ADD_NEW_MESSAGE
    }as const
};



