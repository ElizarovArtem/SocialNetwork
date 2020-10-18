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
};
type profilePageType = {
    posts: Array<PostType>
    newPostText: string
};
type sidebarPageType = {
    friends: Array<FriendsPropsType>
};
type storeType = {
    _state: RootStateType
    getState: () => RootStateType
    addPost: () => void
    changeNewPostText: (newText: string) => void
    subscribe: (observer: (state: RootStateType) => void ) => void
    _callSubscriber: (state: RootStateType) => void
    dispatch: (action: AddPostActionType | ChangeNewPostTextActionType) => void
}
export type AddPostActionType = {
    type: "ADD-POST"
}
export type ChangeNewPostTextActionType = {
    type: "CHANGE-NEW-POST-TEXT"
    newText: string
}


export let store: storeType = {
    _state: <RootStateType>  {
        messagesPage: <messagePageType>{
            dialogs: <Array<DialogItemPropsType>>[
                {id: "1", name: "Ilya"},
                {id: "2", name: "Andrey"},
                {id: "3", name: "Igor"},
            ],
            messages: <Array<MessagePropsType>>[
                {message: "Hello", owner: "first"},
                {message: "Lets have a dinner together today", owner: "first"},
                {message: "Lets go", owner: "second"},
            ],
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
    _callSubscriber (state: RootStateType) {
        console.log("good")
    },
    getState () {
        return this._state
    },
    addPost() {
        let newPost: PostType = {id: 5, message: this._state.profilePage.newPostText, likesCount: 0};
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = "";
        this._callSubscriber(this._state);
    },
    changeNewPostText (newText: string) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },
    subscribe (observer) {
        this._callSubscriber = observer;
    },
    dispatch(action: AddPostActionType | ChangeNewPostTextActionType) {
        if(action.type === "ADD-POST"){
            let newPost: PostType = {id: 5, message: this._state.profilePage.newPostText, likesCount: 0};
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = "";
            this._callSubscriber(this._state);
        }else if(action.type === "CHANGE-NEW-POST-TEXT"){
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }
    }
};




