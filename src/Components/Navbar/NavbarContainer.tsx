import React from 'react';
import {Navbar} from "./Navbar";
import StoreContext from "../../StoreContext";

type NavbarPropsType = {}

export function NavbarContainer(props: NavbarPropsType) {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().sidebar

                    return (
                        <Navbar friends={state.friends}/>
                    )
                }
            }
        </StoreContext.Consumer>
        )
}

