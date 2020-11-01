import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import { Route} from "react-router-dom";
import {DialogsContainer} from "./Components/Dialogs/DialogsContainer";
import {NavbarContainer} from "./Components/Navbar/NavbarContainer";


type AppPropsType = {}

function App(props: AppPropsType) {
    return (
        <div className="app-wrapper">
            <Header/>
            <NavbarContainer />
            <div className="app-wrapper-content">
                <Route render={() => <Profile />}
                       path="/profile"/>
                <Route render={() => <DialogsContainer />}
                       path="/dialogs" />
            </div>
        </div>
    )

}

export default App;
