import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

const MapStateToProps = (store: AppStateType) => {
    return {
        isAuth: store.auth.isAuth
    }
}

export const WithAuthRedirect = (Component: Function) => {
    class RedirectComponent extends React.Component<any> {
        render() {
            if(!this.props.isAuth) return <Redirect to={"/login"}/>

            return <Component {...this.props}/>
        }
    }
    const ConnectedAuthRedirectComponent = connect(MapStateToProps)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}