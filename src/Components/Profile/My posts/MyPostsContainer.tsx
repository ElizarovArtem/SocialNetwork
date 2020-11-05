import React from 'react';
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {ActionTypes, ProfilePageType} from "../../../redux/state";


let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        myPostsState: state.profilePage
    }
}

type MapStateToPropsType = {
    myPostsState: ProfilePageType
}

let mapDispatchToProps = (dispatch: (action: ActionTypes) => void): MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch({type: "ADD-POST"});
        },
        onNewPostText: (text: string) => {
            dispatch({type: "CHANGE-NEW-POST-TEXT", newText: text});
        }
    }
}

type MapDispatchToPropsType = {
    addPost: () => void
    onNewPostText: (text: string) => void
}

export const MyPostsContainer = connect<MapStateToPropsType,MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)