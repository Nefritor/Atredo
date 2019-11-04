import React from 'react';
import Base from '../Base';
import Scrollbar from 'react-scrollbars-custom';
import Popup from 'components/Popup/Popup';
import {MainRPC} from 'rpc';
import {ReactComponent as ImagePlus} from 'lib/plus.svg';
import './Main.css'

export default class Main extends Base {
    getData(config, resolve) {
        MainRPC.getProjectList(config).then((data) => {
            resolve({
                projects: data
            });
        });
    }

    getPopupTemplate() {
        return <div className="Main-projectAdd">
            <div className="Main-projectAdd-head">
                Добавить проект
            </div>
            <div className="Main-projectAdd-body">
                <div className="Main-projectAdd-body-row">
                    <span className="Main-projectAdd-body-row-name">Название</span>
                    <input className="Main-projectAdd-body-row-input"
                           value={this.getPopupPropValue('title')}
                           onChange={this.popupDataChange.bind(this, 'title')}/>
                </div>
                <div className="Main-projectAdd-body-row">
                    <span className="Main-projectAdd-body-row-name">Описание</span>
                    <textarea className="Main-projectAdd-body-row-textarea"
                           value={this.getPopupPropValue('description')}
                           onChange={this.popupDataChange.bind(this, 'description')}/>
                </div>
            </div>
            <div className="Main-projectAdd-footer">
                <div className="Main-projectAdd-footer-button buttonOK" onClick={this.confirmAdd.bind(this)}>ОК</div>
                <div className="Main-projectAdd-footer-button buttonCancel" onClick={this.cancelAdd.bind(this)}>Отмена
                </div>
            </div>
        </div>;
    }

    confirmAdd() {
        this.closePopup();
    }

    cancelAdd() {
        this.closePopup(true);
    }

    _openConstructor(projectData) {
        this.appHandlers.pageChange('Constructor', {key: projectData.key, title: projectData.title});
    }

    _addProject() {
        this.openPopup({title: '', description: ''}).then((result) => {
            MainRPC.addProject(result).then(() => {
                this.reloadPage();
            })
        });
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
                        <div className="Main-project Main-project-image" onClick={this._addProject.bind(this)}>
                            <ImagePlus className="Main-project-image-plus"/>
                        </div>
                    </div>
                </Scrollbar>
            </div>
        )
    }
}