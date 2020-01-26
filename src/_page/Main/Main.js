import React from 'react';
import Base from '../Base';
import Scrollbar from 'react-scrollbars-custom';
import {MainRPC} from 'rpc';
import {ReactComponent as ImagePlus} from 'lib/plus.svg';

export default class Main extends Base {
    getData(config, resolve) {
        MainRPC.getProjectList(config).then((data) => {
            resolve({
                projects: data
            });
        });
    }

    getAddProjectPopupTemplate() {
        return <div className="Popup">
            <div className="Popup-head">
                Добавить проект
            </div>
            <div className="Popup-body">
                <div className="Popup-body-row">
                    <span className="Popup-body-row-name">Название</span>
                    <input className="Popup-body-row-input"
                           value={this.getPopupPropValue('title')}
                           onChange={this.popupDataChange.bind(this, 'title')}/>
                </div>
                <div className="Popup-body-row">
                    <span className="Popup-body-row-name">Описание</span>
                    <div className="Popup-body-row-textarea-scroll">
                    <textarea className="Popup-body-row-textarea"
                           value={this.getPopupPropValue('description')}
                           onChange={this.popupDataChange.bind(this, 'description')}/>
                    </div>
                </div>
            </div>
            <div className="Popup-footer Popup-footer-rightAlign">
                <div className="Popup-footer-button buttonOK" onClick={this.confirmAdd.bind(this)}>ОК</div>
                <div className="Popup-footer-button buttonCancel" onClick={this.cancelAdd.bind(this)}>Отмена
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
        this.appHandlers.pageChange('Constructor', {_id: projectData._id, title: projectData.title});
    }

    _addProject() {
        this.openPopup(this.getAddProjectPopupTemplate.bind(this), {title: '', description: ''}).then((result) => {
            if (result.title === '') {
                /// нет заголовка
            } else {
                MainRPC.addProject(result).then(() => {
                    this.reloadPage();
                })
            }
        });
    }

    getRender() {
        return (
            <div className="Main">
                <Scrollbar style={{width: '100%', height: '100%'}}>
                    <div className="Main-scrollContainer">
                        {Array.from(this.state.pageData.projects).map((project) =>
                            <div key={project._id} className="Main-project"
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