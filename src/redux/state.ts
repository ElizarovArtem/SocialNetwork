import {DialogItemPropsType} from "../Components/Dialogs/DialogItem/DialogItem";
import {MessagePropsType} from "../Components/Dialogs/Message/Message";
import {PostType} from "../Components/Profile/My posts/Post/Post";
import {FriendsPropsType} from "../Components/Navbar/Friends/Friend";

let renderEntireTree = (state: RootStateType) => {
    console.log("good")
}

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

export let state: RootStateType = {
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
            {name: "Natan"}
        ]
    }
};

export const addPost = () => {
    let newPost: PostType = {id: 5, message: state.profilePage.newPostText, likesCount: 0};
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = "";
    renderEntireTree(state);
};

export const changeNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText;
    renderEntireTree(state);
}

export const subscribe = (observer: (state: RootStateType) => void ) => {
    renderEntireTree = observer;
}

