import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import {NavbarContainer} from "./Components/Navbar/NavbarContainer";
import {UserBigContainer} from "./Components/Users/UsersContainer";
import {ProfileBigContainer} from "./Components/Profile/ProfileContainer";
import {HeaderBigContainer} from "./Components/Header/HeaderContainer";
import {LoginContainer} from "./Components/Login/Login";
import {connect} from "react-redux";
import {AppStateType} from "./redux/redux-store";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {initializedThunk} from "./redux/App-reducer";
import {Preloader} from "./Components/common/Preloader/Preloader";


type AppPropsType = MapStateToPropsType & MapDispatchToPropsType

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializedThunk()
    }

    render() {
        if(!this.props.initialized) return <Preloader/>

        return (
            <div className="app-wrapper">
                <HeaderBigContainer/>
                <NavbarContainer/>
                <div className="app-wrapper-content">
                    <Route render={() => <ProfileBigContainer/>}
                           path="/profile/:userId?"/>
                    <Route render={() => <DialogsContainer/>}
                           path="/dialogs"/>
                    <Route render={() => <UserBigContainer/>}
                           path={"/users"}/>
                    <Route render={() => <LoginContainer/>}
                           path={"/login"}/>
                </div>
            </div>
        )
    }
}

type MapStateToPropsType = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializedThunk: () => void
}
let MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        initialized: state.app.initialized
    }
}

export const ConnectedApp = compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType,
        MapDispatchToPropsType,
        {},
        AppStateType>(MapStateToProps, {initializedThunk}))(App);
