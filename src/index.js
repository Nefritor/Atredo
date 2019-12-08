import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import * as serviceWorker from 'serviceWorker';
import 'styleslib.css'

const startPage = 'Main';
const pageConfig = {
    title: 'Главная'
};

ReactDOM.render(<App startPage={startPage} config={pageConfig}/>, document.getElementById('Application'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
