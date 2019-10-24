import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const defaultPage = 'Main';
const pageConfig = {
    projects: [
        { key: 0, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное' },
        { key: 1, title: 'Новый проект с очень длинным описанием. Очень длинным, очень длинным, очень длинным', description: 'Очень длинное описание. Вот прям очень длинное, очень длинное, очень длинное, очень длинное, очень длинное, очень длинное, очень длинное.' },
        { key: 2, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное' },
        { key: 3, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное' },
        { key: 4, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное' },
        { key: 5, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное' },
        { key: 6, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное' },
        { key: 7, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное' },
        { key: 8, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное' },
        { key: 9, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное' },
        { key: 10, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное' },
        { key: 11, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное' },
        { key: 12, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное' },
        { key: 13, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное' },
        { key: 14, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное' },
    ]
};

ReactDOM.render(<App pageName={defaultPage} pageConfig={pageConfig}/>, document.getElementById('Application'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
