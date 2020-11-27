import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Profile} from "./Components/Profile/Profile";
import {Route} from "react-router-dom";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import {NavbarContainer} from "./Components/Navbar/NavbarContainer";
import {UserBigContainer} from "./Components/Users/UsersContainer";
import {ProfileBigContainer} from "./Components/Profile/ProfileContainer";
import {HeaderBigContainer} from "./Components/Header/HeaderContainer";


function App() {
    return (
        <div className="app-wrapper">
            <HeaderBigContainer/>
            <NavbarContainer/>
            <div className="app-wrapper-content">
                <Route render={() => <ProfileBigContainer />}
                       path="/profile/:userId?"/>
                <Route render={() => <DialogsContainer/>}
                       path="/dialogs"/>
                <Route render={() => <UserBigContainer />}
                       path={"/users"}/>
            </div>
        </div>
    )
}

export default App;
