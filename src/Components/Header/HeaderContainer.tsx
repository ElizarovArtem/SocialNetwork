import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {authMeThunk} from "../../redux/AuthReducer";


type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType
export class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        this.props.authMeThunk()
    }

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login}/>
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
    authMeThunk: () => void
}
export const HeaderBigContainer =
    connect<
        MapStateToPropsType,
        MapDispatchToPropsType,
        {},
        AppStateType
        >(mapStateToProps, {authMeThunk})(HeaderContainer)