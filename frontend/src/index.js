import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./redux/reducer";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    </Provider>,
  document.getElementById('root')
);

