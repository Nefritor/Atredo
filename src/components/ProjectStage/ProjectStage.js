import React from 'react';
import Action from './Action/Action';
import Actor from './Actor/Actor';
import Object from './Object/Object';
import {OperationRPC} from 'rpc';

export default class ProjectStage extends React.Component {
    constructor(props) {
        super(props);
        this._openPopup = this.props.popupHandlers().open.bind(this);
        this._closePopup = this.props.popupHandlers().close.bind(this);
        this._updatePopup = this.props.popupHandlers().update.bind(this);
        this._getPopupValue = this.props.popupHandlers().getValue.bind(this);
        this._setPopupValue = this.props.popupHandlers().setValue.bind(this);
        this._addOperation = this.props.constructorHandlers().add.bind(this);
        this._updateOperation = this.props.constructorHandlers().update.bind(this);
        this._startLoading = this.props.loadingHandlers().start.bind(this);
        this._stopLoading = this.props.loadingHandlers().stop.bind(this);
        this.state = {
            popupList: [],
            stageData: props.stageData,
            addTitle: '',
            addDescription: ''
        }
    }

    selectorPopup(name, operationKey, header) {
        return (
            <div className="Popup">
                <div className="Popup-head">
                    {header}
                </div>
                <div className="Popup-body">
                    {!!this.state.popupList.length &&
                    <div className="Popup-body-heading">
                        <span className="Popup-body-heading-column col-2">ID</span>
                        <span className="Popup-body-heading-column col-8">Название</span>
                    </div>
                    }
                    {this.state.popupList.map((item) => {
                        return <div key={item._id} className="Popup-body-rowItem"
                                    onClick={this.selectItem.bind(this, name, operationKey, item._id)}>
                            <span className="Popup-body-rowItem-column col-2">{item._id}</span>
                            <span className="Popup-body-rowItem-column col-6">{item.title}</span>
                            <div className="Popup-body-rowItem-button col-2"
                                 onClick={(event) => this.deleteItem(event, name, operationKey, item._id)}>Удалить
                            </div>
                        </div>
                    })}
                </div>
                <div className="Popup-footer">
                    <span className="Popup-body-row-name">Название</span>
                    <input className="Popup-body-row-input"
                           value={this._getPopupValue('title')}
                           onChange={this.popupDataChange.bind(this, 'title')}/>
                    <div className="Popup-body-row-accept"
                         onClick={this.addItem.bind(this, name, {title: this._getPopupValue('title')})}>
                        Добавить
                    </div>
                </div>
            </div>
        );
    }

    openSelector(name, operationKey, title) {
        this._startLoading();
        OperationRPC[`get${name}sList`]().then((list) => {
            this._stopLoading();
            this.setState({
                popupList: list
            });
            this._openPopup(
                this.selectorPopup.bind(this, name, operationKey, title), {title: '', [name]: null}
            );
        })
    }

    addItem(name, data) {
        OperationRPC['add' + name](data).then((result) => {
            this.setState({
                popupList: [
                    ...this.state.popupList,
                    {
                        key: result,
                        ...data
                    }]
            });
            this._updatePopup();
        })
    }

    deleteItem(event, name, operationKey, itemKey) {
        event.stopPropagation();
        OperationRPC['remove' + name](itemKey).then((data) => {
            this.setState({
                popupList: data
            });
            this._updatePopup();
        })
    }

    selectItem(name, operationKey, itemKey) {
        this.state.stageData.operations.some((operation, index) => {
            if (operation._id === operationKey) {
                const itemName = (() => {
                    switch (name) {
                        case 'Actor':
                            return 'actor';
                        case 'Action':
                            return 'action';
                        case 'Object':
                            return 'object';
                        default:
                            throw Error('Unknown item name');
                    }
                })();
                operation[itemName] = itemKey;
                this._setPopupValue(name, itemKey);
                this._updateOperation(this.props.stageIndex, index, operation);
                return true;
            }
            return false;
        });
        this._closePopup();
    }

    addOperationHandler() {
        if (this.state.addTitle && this.state.addDescription) {
            this._addOperation(
                this.props.stageIndex,
                {
                    _id: this.state.stageData.operations.length ?
                        Math.max(...this.state.stageData.operations.map(x => x._id)) + 1 : 0,
                    title: this.state.addTitle,
                    description: this.state.addDescription,
                    actor: -1,
                    object: -1,
                    action: -1
                }
            );
            this.setState({
                addTitle: '',
                addDescription: '',
                initNewOperation: true
            });
            setTimeout(() => {
                this.setState({
                    initNewOperation: false
                });
            }, 300)
        }
    }

    addTitleChanged(event) {
        this.setState({
            addTitle: event.target.value
        })
    }

    addDescriptionChanged(event) {
        this.setState({
            addDescription: event.target.value
        })
    }

    popupDataChange(prop, event) {
        this._setPopupValue(prop, event.target.value)
    }

    render() {
        return (
            <div className={`ProjectStage${this.state.initNewOperation ? ' ProjectStage-init' : ''}`}>
                <div className="ProjectStage-header">
                    <div className="ProjectStage-header-title" title={'Этап: ' + this.state.stageData.title}>
                        <div className="ProjectStage-header-title-top">Этап</div>
                        <div className="ProjectStage-header-title-bottom">{this.state.stageData.title}</div>
                    </div>
                </div>
                {this.state.stageData.operations.map((operation) =>
                    <div key={operation._id} className="ProjectStage-operation">
                        <div className="ProjectStage-operation-column-info">
                            <div className="ProjectStage-operation-title">{operation.title}</div>
                            <div className="ProjectStage-operation-description-scrollContainer">
                                <div className="ProjectStage-operation-description-content">
                                    {operation.description}
                                </div>
                            </div>
                        </div>
                        <div className="ProjectStage-operation-column-interactive">
                            <div className="ProjectStage-operation-container">
                                <Actor id={operation.actor}
                                       openSelector={
                                           this.openSelector.bind(
                                               this,
                                               'Actor',
                                               operation._id,
                                               'Выбрать исполнителя'
                                           )
                                       }/>
                            </div>
                            <div className="ProjectStage-operation-container">
                                <Action id={operation.action}
                                        openSelector={
                                            this.openSelector.bind(
                                                this,
                                                'Action',
                                                operation._id,
                                                'Выбрать действие'
                                            )
                                        }/>
                            </div>
                            <div className="ProjectStage-operation-container">
                                <Object id={operation.object}
                                        openSelector={
                                            this.openSelector.bind(
                                                this,
                                                'Object',
                                                operation._id,
                                                'Выбрать объект'
                                            )
                                        }/>
                            </div>
                        </div>
                    </div>
                )}
                <div className="ProjectStage-addTemplate">
                    <div className="ProjectStage-operation-column-info-input">
                        <input className="ProjectStage-operation-title-input"
                               placeholder="Название операции"
                               onChange={this.addTitleChanged.bind(this)}
                               value={this.state.addTitle}/>
                        <div className="ProjectStage-operation-description-scrollContainer-input">
                            <textarea className="ProjectStage-operation-description-content-input"
                                      placeholder="Описание"
                                      onChange={this.addDescriptionChanged.bind(this)}
                                      value={this.state.addDescription}/>
                        </div>
                    </div>
                    <div className="ProjectStage-operation-column-interactive-input">
                        <div className="ProjectStage-operation-button" onClick={this.addOperationHandler.bind(this)}>
                            Добавить
                        </div>
                    </div>
                    <div className="ProjectStage-addTemplate-bottomLine"/>
                </div>
            </div>
        )
    }
}