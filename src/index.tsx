import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store, {AppStateType} from "./redux/redux-store";
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';




let renderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store} >
            <App />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

renderEntireTree();

store.subscribe(renderEntireTree);






// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();




