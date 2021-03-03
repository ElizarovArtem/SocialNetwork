import React from 'react';
import './App.css';
import {BrowserRouter, HashRouter, Route, Switch, Redirect} from "react-router-dom";
//import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import {NavbarContainer} from "./Components/Navbar/NavbarContainer";
import {UserBigContainer} from "./Components/Users/UsersContainer";
//import {ProfileBigContainer} from "./Components/Profile/ProfileContainer";
import {HeaderBigContainer} from "./Components/Header/HeaderContainer";
import {LoginContainer} from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import store, {AppStateType} from "./redux/redux-store";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {initializedThunk} from "./redux/AppReducer";
import {Preloader} from "./Components/common/Preloader/Preloader";
import {WithSuspense} from "./hoc/WithSuspense";
import {Modal} from "./Modals/Modal";

const DialogsContainer = React.lazy(() => import("./Components/Dialogs/DialogsContainer"))
const ProfileBigContainer = React.lazy(() =>
    import('./Components/Profile/ProfileContainer')
        .then(({ProfileBigContainer}) => ({default: ProfileBigContainer})),
);

type AppPropsType = MapStateToPropsType & MapDispatchToPropsType

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializedThunk()
    }

    render() {

        if (!this.props.initialized) return <Preloader/>

        let top:number;
        if(this.props.error) {
            top = 50
        }else {
            top = -50
        }

        return (
            <div className="app-wrapper">
                <HeaderBigContainer/>
                <NavbarContainer/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route render={WithSuspense(ProfileBigContainer)}
                               path="/profile/:userId?"/>
                        <Route render={WithSuspense(DialogsContainer)}
                               path="/dialogs"/>
                        <Route render={() => <UserBigContainer/>}
                               path={"/users"}/>
                        <Route render={() => <LoginContainer/>}
                               path={"/login"}/>
                        <Route exact render={() => <Redirect to={"/profile"}/>}
                               path={"/"}/>
                        <Route render={() => <div>404 - ERROR</div>}
                               path={"*"}/>
                    </Switch>
                </div>

                <Modal
                    title={this.props.error as string}
                    width={250}
                    height={100}
                    backgroundDiv={false}
                    bgOnClick={()=>{}}
                    CSSStyles={{
                        top: top + "vh",
                        backgroundColor: "red"
                    }}
                />
            </div>
        )
    }
}

type MapStateToPropsType = {
    initialized: boolean
    error: string | null
}
type MapDispatchToPropsType = {
    initializedThunk: () => void
}
let MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        initialized: state.app.initialized,
        error: state.app.error
    }
}

export const ConnectedApp = compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType,
        MapDispatchToPropsType,
        {},
        AppStateType>(MapStateToProps, {initializedThunk}))(App);


export const SamuraiJSApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ConnectedApp/>
            </Provider>
        </BrowserRouter>
    )
}
