/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/


import store from "./store/index";
import { addArticle } from "./actions/index";
window.store = store;
window.addArticle = addArticle;