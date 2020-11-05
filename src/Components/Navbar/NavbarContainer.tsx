import React from 'react';
import {Navbar} from "./Navbar";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => {
    return{
        sidebarState: state.sidebar
    }
}

let mapDispatchToProps = () => {}

export const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar)