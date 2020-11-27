import React from 'react';
import axios from "axios";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setUserDataAC} from "../../redux/AuthReducer";
import {authAPI} from "../../api/api";


type HeaderContainerPropsType = {
    login: string | null
    isAuth: boolean
    setUserDataAC: (id: number, email: string, login: string) => void
}
export class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        authAPI.authMe().then(data => {
                if(data.resultCode === 0){
                    let {id, login, email} = data.data
                    this.props.setUserDataAC(id, login, email)
                }
            })
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
    setUserDataAC: (id: number, email: string, login: string) => void
}
export const HeaderBigContainer =
    connect<
        MapStateToPropsType,
        MapDispatchToPropsType,
        {},
        AppStateType
        >(mapStateToProps, {setUserDataAC})(HeaderContainer)