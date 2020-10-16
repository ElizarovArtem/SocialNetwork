import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {Navbar} from "./Components/Navbar/Navbar";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {RootStateType} from "./redux/state";

type AppPropsType ={
    state: RootStateType
    addPost: () => void
    changeNewPostText: (newText: string) => void
}

function App(props: AppPropsType) {
    return (
            <div className="app-wrapper">
                <Header/>

                <Navbar friends={props.state.sidebar.friends}/>
                <div className="app-wrapper-content">
                    <Route render={() => <Profile profileState={props.state.profilePage}
                                                  changeNewPostText={props.changeNewPostText}
                                                  addPost={props.addPost}/>}
                           path="/profile"/>
                    <Route render={() => <Dialogs dialogsState={props.state.messagesPage} />} path="/dialogs"/>
                </div>
            </div>
    )

}

export default App;
