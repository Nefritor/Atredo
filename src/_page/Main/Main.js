import React from 'react';
import Base from '../Base';
import Scrollbar from 'react-scrollbars-custom';
import {ReactComponent as ImagePlus} from '../../lib/plus.svg';
import './Main.css'

export default class Main extends Base {
    getData(config, resolve) {
        setTimeout(() => {
            resolve({
                projects: [
                    {key: 0, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное'},
                    {
                        key: 1,
                        title: 'Новый проект с очень длинным описанием. Очень длинным, очень длинным, очень длинным',
                        description: 'Очень длинное описание. Вот прям очень длинное, очень длинное, очень длинное, очень длинное, очень длинное, очень длинное, очень длинное.'
                    },
                    {key: 2, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное'},
                    {key: 3, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное'},
                    {key: 4, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное'},
                    {key: 5, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное'},
                    {key: 6, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное'},
                    {key: 7, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное'},
                    {key: 8, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное'},
                    {key: 9, title: 'Новый проект', description: 'Описание проекта очень длинное, очень длинное'}
                ]
            });
        }, 300)
    }

    _openConstructor(projectData) {
        this.appHandlers.pageChange('Constructor', {key: projectData.key, title: projectData.title});
    }

    getRender() {
        return (
            <div className="Main">
                <Scrollbar style={{width: '100%', height: '100%'}}>
                    <div className="Main-scrollContainer">
                        {this.pageData.projects.map((project) =>
                            <div key={project.key} className="Main-project"
                                 onClick={this._openConstructor.bind(this, project)}>
                                <div className="Main-project-title" title={project.title}>{project.title}</div>
                                <div className="Main-project-description">{project.description}</div>
                            </div>
                        )}
                        <div className="Main-project Main-project-image">
                            <ImagePlus className="Main-project-image-plus"/>
                        </div>
                    </div>
                </Scrollbar>
            </div>
        )
    }
}