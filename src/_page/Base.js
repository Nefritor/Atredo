import React from 'react';
import {ReactComponent as LoadingAnimation} from "lib/loading.svg";

export default class Base extends React.Component {
    constructor(props) {
        super(props);
        this.appHandlers = props.appHandlers;
        this.state = {
            dataReady: false,
            loading: {
                show: true,
                transparent: true
            },
            popup: {
                show: false,
                transparent: true
            },
            navBarActions: undefined
        };
        this.reloadPage();
    }

    reloadPage(config = this.props.config) {
        new Promise(resolve => {
            this.startLoading();
            this.getData(config, resolve);
        }).then(pageData => {
            this.setState({
                pageData
            });
            this.appHandlers.setNavBarActions(this.state.navBarActions);
            this.stopLoading();
        })
    }

    startLoading() {
        this.loadingTimeout = setTimeout(() => {
            this.setState({
                loading: {
                    show: true,
                    transparent: false
                }
            });
        }, 0);
    }

    stopLoading() {
        clearTimeout(this.loadingTimeout);
        this.setState({
            loading: {
                show: true,
                transparent: true
            },
            dataReady: true
        });
        setTimeout(() => {
            this.setState({
                loading: {
                    show: false,
                    transparent: true
                }
            });
        }, 300);
    }

    openPopup(popupTemplate, data = {}) {
        return new Promise((resolve, reject) => {
            if (this.state.popup.show === false && popupTemplate) {
                this.setState({
                    popupComponent: popupTemplate,
                    popupData: data,
                    popup: {
                        show: true,
                        transparent: true
                    }
                });
                setTimeout(() => {
                    this.setState({
                        popup: {
                            show: true,
                            transparent: false
                        }
                    });
                }, 0);
                this.popupDataReady = Promise.resolve();
                this.closePopupResolver = resolve.bind(this);
            } else if (popupTemplate) {
                console.warn('Popup opening try has been observed and cancelled');
                reject();
            } else {
                console.warn('Trying to open popup without template');
                reject();
            }
        });
    }

    closePopup(forceClose = false) {
        if (this.closePopupResolver) {
            this.popupDataReady.then(() => {
                if (!forceClose) {
                    this.closePopupResolver(this.state.popupData);
                }
                this.closePopupResolver = undefined;
                this.setState({
                    popup: {
                        show: true,
                        transparent: true
                    }
                });
                setTimeout(() => {
                    this.setState({
                        popupComponent: undefined,
                        popupData: undefined,
                        popup: {
                            show: false,
                            transparent: true
                        }
                    });
                }, 300);
            });
        } else {
            console.warn('There is no active popup')
        }
    }

    updatePopup(popupTemplate = this.state.popupComponent, data = this.state.popupData) {
        this.setState({
            popupComponent: popupTemplate,
            popupData: data
        });
    }

    popupHandlers() {
        return {
            open: this.openPopup.bind(this),
            close: this.closePopup.bind(this),
            update: this.updatePopup.bind(this),
            getValue: this.getPopupPropValue.bind(this),
            setValue: this.setPopupPropValue.bind(this)
        }
    }

    loadingHandlers() {
        return {
            start: this.startLoading.bind(this),
            stop: this.stopLoading.bind(this)
        }
    }

    popupDataChange(popupProp, event) {
        this.setPopupPropValue(popupProp, event.target.value);
    }

    setPopupPropValue(popupProp, value) {
        this.popupDataReady = new Promise((resolve) => {
            this.setState({
                popupData: {
                    ...this.state.popupData,
                    [popupProp]: value
                }
            }, () => {
                resolve();
            });
        });
    }

    getPopupPropValue(name) {
        return this.state.popupData[name];
    }

    popupBackgroundClick(event) {
        if (event.target.id === 'popupBackground') {
            this.closePopup(true);
        }
    }

    getData() {
        throw Error('Data getter must be declared inside child component');
    }

    getRender() {
        throw Error('Renderer must be declared inside child component');
    }

    getLoadingClassName(params, className) {
        if (params.show) {
            if (params.transparent) {
                return `${className}-transparent`
            } else {
                return `${className}-loading`;
            }
        } else {
            return `${className}-hidden`;
        }
    }

    getLoader() {
        return <div className={this.getLoadingClassName(this.state.loading, 'App-body-page-loadingAnimation')}>
            <LoadingAnimation className="App-body-page-loadingAnimation"/>
        </div>
    }

    getPopup() {
        return <div
            className={`App-body-page-popup ${this.getLoadingClassName(this.state.popup, 'App-body-page-popup')}`}
            onClick={this.popupBackgroundClick.bind(this)}
            id="popupBackground">
            <this.state.popupComponent/>
        </div>
    }

    render() {
        return (
            <div className="App-body-page">
                {this.state.dataReady && this.getRender()}
                {this.state.loading.show && this.getLoader()}
                {this.state.popup.show && this.getPopup()}
            </div>
        )
    }
}