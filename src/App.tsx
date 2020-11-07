import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Profile} from "./Components/Profile/Profile";
import {Route} from "react-router-dom";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import {NavbarContainer} from "./Components/Navbar/NavbarContainer";
import {Users} from "./Components/Users/Users";
import {UsersContainer} from "./Components/Users/UsersContainer";


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
                <Route render={() => <UsersContainer/>}
                       path={"/users"}/>
            </div>
        </div>
    )

}

export default App;
