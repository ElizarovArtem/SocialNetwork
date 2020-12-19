import React from 'react';
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {ActionTypes, AppStateType} from "../../redux/redux-store";
import {InitialStateType} from "../../redux/MessageReducer";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsState: state.messagesPage,
        isAuth: state.auth.isAuth
    }
}

type MapStateToPropsType = {
    dialogsState: InitialStateType
    isAuth: boolean
}

let mapDispatchToProps = (dispatch: (action: ActionTypes) => void): MapDispatchToPropsType => {
    return {
        onSendMessage: (newMessage: string) => {
            dispatch({type: "ADD-NEW-MESSAGE", newMessage})
        }
    }
}

type MapDispatchToPropsType = {
    onSendMessage: (newMessage: string) => void
}

export const DialogsContainer = compose<React.ComponentType>(
    connect<MapStateToPropsType,
        MapDispatchToPropsType,
        {},
        AppStateType>(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)
