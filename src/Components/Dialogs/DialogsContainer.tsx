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
        onChangeNewMessageBody: (text: string) => {
            dispatch({type: "CHANGE-NEW-MESSAGE-BODY", body: text});
        },
        onSendMessage: () => {
            dispatch({type: "ADD-NEW-MESSAGE"})
        },
        onSendMessageKeyPress: () => {
            dispatch({type: "ADD-NEW-MESSAGE"})
        }
    }
}

type MapDispatchToPropsType = {
    onChangeNewMessageBody: (text: string) => void
    onSendMessage: () => void
    onSendMessageKeyPress: () => void
}

export const DialogsContainer = compose<React.ComponentType>(
    connect<MapStateToPropsType,
        MapDispatchToPropsType,
        {},
        AppStateType>(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)
