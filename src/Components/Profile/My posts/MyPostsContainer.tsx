import React from 'react';
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {ActionTypes} from "../../../redux/redux-store";
import {InitialStateType} from "../../../redux/ProfileReducer";


let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        myPostsState: state.profilePage
    }
}

type MapStateToPropsType = {
    myPostsState: InitialStateType
}

let mapDispatchToProps = (dispatch: (action: ActionTypes) => void): MapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch({type: "ADD-POST", newPostText});
        }
    }
}

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}

export const MyPostsContainer = connect<MapStateToPropsType,MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)