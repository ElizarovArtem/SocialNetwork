import React from "react";
import {StoreType} from "./redux/state";

const StoreContext = React.createContext({} as StoreType);

export type ProviderType = {
    store: any
    children: any
}

export function Provider(props: ProviderType) {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContext;