import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {store, RootStateType} from "./redux/state";
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";



let renderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state}
                 dispatch={store.dispatch.bind(store)}
                 store={store}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

renderEntireTree(store.getState());

store.subscribe(renderEntireTree);






// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();




