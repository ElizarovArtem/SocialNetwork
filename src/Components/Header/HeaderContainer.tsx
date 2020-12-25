import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import { logOutThunk} from "../../redux/AuthReducer";


type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType
export class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login} logOutThunk={this.props.logOutThunk}/>
    };
}

type MapStateToPropsType = {
    login: string | null
    isAuth: boolean
}
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}
type MapDispatchToPropsType = {
    logOutThunk: () => void
}
export const HeaderBigContainer =
    connect<
        MapStateToPropsType,
        MapDispatchToPropsType,
        {},
        AppStateType
        >(mapStateToProps, {logOutThunk})(HeaderContainer)