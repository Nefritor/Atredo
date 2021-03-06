import React from 'react';
import Base from '../Base';
import Scrollbar from 'react-scrollbars-custom';
import ProjectStage from 'components/ProjectStage/ProjectStage';
import {ReactComponent as ImagePlus} from 'lib/plus.svg';
import {ProjectRPC} from "rpc";

export default class Constructor extends Base {
    getData(config, resolve) {
        this.projectKey = config.key;
        ProjectRPC.getStagesList(this.projectKey).then((data) => {
            resolve({
                stages: data.stages || []
            });
            this.setState({
                navBarActions: this.getNavBarActions()
            });
        });
    }

    getNavBarActions() {
        return <div className="App-body-navBar-actions-addButton" onClick={this._addStage.bind(this)}><ImagePlus/>
        </div>;
    }

    getAddStagePopupTemplate() {
        return <div className="Popup">
            <div className="Popup-head">
                Добавить этап
            </div>
            <div className="Popup-body">
                <div className="Popup-body-row">
                    <span className="Popup-body-row-name">Название</span>
                    <input className="Popup-body-row-input"
                           value={this.getPopupPropValue('title')}
                           onChange={this.popupDataChange.bind(this, 'title')}/>
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

    _addStage() {
        this.openPopup(this.getAddStagePopupTemplate.bind(this), {title: ''}).then((result) => {
            if (result.title === '') {
                /// нет заголовка
            } else {
                this._updateStagesList([
                    ...this.state.pageData.stages,
                    {
                        title: result.title,
                        operations: []
                    }
                ]).then(() => {
                    this.setState({
                        initNewStage: true
                    });
                    setTimeout(() => {
                        this.setState({
                            initNewStage: false
                        });
                    }, 300);
                });
            }
        });
    }

    _updateStagesList(stages) {
        return ProjectRPC.updateStagesList(this.projectKey, {
            key: this.projectKey,
            stages
        }).then((result) => {
            this.setState({
                pageData: {
                    stages: result.stages
                }
            });
        })
    }

    addOperation(stageIndex, data) {
        this.state.pageData.stages[stageIndex].operations.push(data);
        this._updateStagesList(this.state.pageData.stages);
    }

    updateOperation(stageIndex, operationIndex, data) {
        this.state.pageData.stages[stageIndex].operations[operationIndex] = data;
        this._updateStagesList(this.state.pageData.stages);
    }

    constructorHandlers() {
        return {
            add: this.addOperation.bind(this),
            update: this.updateOperation.bind(this)
        }
    }

    getRender() {
        return (
            <div className="Constructor">
                <Scrollbar style={{width: '100%', height: '100%'}}>
                    <div className="Constructor-scrollContainer">
                        <div
                            className={`Constructor-stagesLine${this.state.initNewStage ? ' Constructor-stagesLine-init' : ''}`}>
                            {this.state.pageData.stages.map((stage, key) =>
                                <ProjectStage key={key}
                                              stageIndex={key}
                                              stageData={stage}
                                              popupHandlers={this.popupHandlers.bind(this)}
                                              loadingHandlers={this.loadingHandlers.bind(this)}
                                              constructorHandlers={this.constructorHandlers.bind(this)}/>
                            )}
                        </div>
                    </div>
                </Scrollbar>
            </div>
        )
    }
}