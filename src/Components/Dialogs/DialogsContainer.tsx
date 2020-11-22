import React from 'react';
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {ActionTypes, AppStateType} from "../../redux/redux-store";
import {InitialStateType} from "../../redux/MessageReducer";


let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsState: state.messagesPage
    }
}

type MapStateToPropsType = {
    dialogsState: InitialStateType
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

export const DialogsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(Dialogs)