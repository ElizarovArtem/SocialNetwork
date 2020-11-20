import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Profile} from "./Components/Profile/Profile";
import {Route} from "react-router-dom";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import {NavbarContainer} from "./Components/Navbar/NavbarContainer";
import {UserBigContainer, UsersContainer} from "./Components/Users/UsersContainer";


function App() {
    return (
        <div className="app-wrapper">
            <Header/>
            <NavbarContainer/>
            <div className="app-wrapper-content">
                <Route render={() => <Profile/>}
                       path="/profile"/>
                <Route render={() => <DialogsContainer/>}
                       path="/dialogs"/>
                <Route render={() => <UserBigContainer />}
                       path={"/users"}/>
            </div>
        </div>
    )
}

export default App;
