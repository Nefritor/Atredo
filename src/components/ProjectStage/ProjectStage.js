import React from 'react';
import {ReactComponent as ImagePlus} from '../../lib/plus.svg';
import Action from './Action/Action';
import Actor from './Actor/Actor';
import Object from './Object/Object';
import {OperationRPC} from 'rpc';
import './ProjectStage.css';

export default class ProjectStage extends React.Component {
    constructor(props) {
        super(props);
        this.openPopup = this.props.popupHandlers().open.bind(this);
        this.closePopup = this.props.popupHandlers().close.bind(this);
        this.getPopupValue = this.props.popupHandlers().getValue.bind(this);
        this.setPopupValue = this.props.popupHandlers().setValue.bind(this);
        this.startLoading = this.props.loadingHandlers().start.bind(this);
        this.stopLoading = this.props.loadingHandlers().stop.bind(this);
        this.state = {
            popupList: [],
            stageData: props.stageData
        }
    }

    templatePopup(name, operationKey, header) {
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
                        return <div key={item.key} className="Popup-body-rowItem"
                                    onClick={this.selectItem.bind(this, name, operationKey, item.key)}>
                            <span className="Popup-body-rowItem-column col-2">{item.key}</span>
                            <span className="Popup-body-rowItem-column col-6">{item.title}</span>
                            <div className="Popup-body-rowItem-button col-2"
                                 onClick={(event) => this.deleteItem(event, name, operationKey, item.key)}>Удалить
                            </div>
                        </div>
                    })}
                    <div className="Popup-body-row">
                        <span className="Popup-body-row-name">Название</span>
                        <input className="Popup-body-row-input"
                               value={this.getPopupValue('title')}
                               onChange={this.popupDataChange.bind(this, 'title')}/>
                        <div className="Popup-body-row-accept"
                             onClick={this.addItem.bind(this, name, {title: this.getPopupValue('title')})}>
                            Добавить
                        </div>
                    </div>
                </div>
                <div className="Popup-footer">
                </div>
            </div>
        );
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
        })
    }

    openSelector(name, operationKey, title) {
        this.startLoading();
        OperationRPC[`get${name}sList`]().then((list) => {
            this.stopLoading();
            this.setState({
                popupList: list
            });
            this.openPopup(this.templatePopup.bind(this, name, operationKey, title), {title: ''}).then((result) => {

            });
        })
    }

    deleteItem(event, name, operationKey, itemKey) {
        event.preventDefault();
        OperationRPC['remove' + name](itemKey).then((data) => {
            this.setState({
                popupList: data
            });
        })
    }

    selectItem(name, operationKey, itemKey) {
        this.state.stageData.operations.some((operation) => {
            if (operation.key === operationKey) {
                const itemName = (() => {
                    switch (name) {
                        case 'Actor':
                            return 'actor';
                        case 'Action':
                            return 'action';
                        case 'Object':
                            return 'object';
                    }
                })();
                operation[itemName] = itemKey;
                return true;
            }
            return false;
        });
    }

    popupDataChange(prop, event) {
        this.setPopupValue(prop, event.target.value)
    }

    render() {
        return (
            <div className="ProjectStage">
                <div className="ProjectStage-header">
                    <div className="ProjectStage-header-title" title={'Этап: ' + this.state.stageData.title}>
                        <div className="ProjectStage-header-title-top">Этап</div>
                        <div className="ProjectStage-header-title-bottom">{this.state.stageData.title}</div>
                    </div>
                </div>
                {this.state.stageData.operations.map((operation) =>
                    <div key={operation.key} className="ProjectStage-operation">
                        <div className="ProjectStage-operation-column-info">
                            <div className="ProjectStage-operation-title">{operation.title}</div>
                            <div className="ProjectStage-operation-description-scrollContainer">
                                <div className="ProjectStage-operation-description-content">
                                    {operation.description}
                                </div>
                            </div>
                            <div className="ProjectStage-operation-bottomInnerShadow"/>
                        </div>
                        <div className="ProjectStage-operation-column-interactive">
                            <div className="ProjectStage-operation-container">
                                <Actor id={operation.actor}
                                       openSelector={
                                           this.openSelector.bind(
                                               this,
                                               'Actor',
                                               operation.key,
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
                                                operation.key,
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
                                                operation.key,
                                                'Выбрать объект'
                                            )
                                        }/>
                            </div>
                        </div>
                    </div>
                )}
                <div className="ProjectStage-addTemplate">Добавить</div>
            </div>
        )
    }
}