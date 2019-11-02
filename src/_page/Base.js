import React from 'react';
import {ReactComponent as LoadingAnimation} from "lib/loading.svg";
import Popup from "components/Popup/Popup";

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
        let loadingTimeout;
        new Promise(resolve => {
            loadingTimeout = setTimeout(() => {
                this.setState({
                    loading: {
                        show: true,
                        transparent: false
                    }
                });
            }, 0);
            this.getData(this.props.config, resolve);
        }).then(pageData => {
            this.pageData = pageData;
            clearTimeout(loadingTimeout);
            this.setState({
                loading: {
                    show: true,
                    transparent: true
                },
                dataReady: true
            });
            this.appHandlers.setNavBarActions(this.state.navBarActions);
            setTimeout(() => {
                this.setState({
                    loading: {
                        show: false,
                        transparent: true
                    }
                });
            }, 300);
        })
    }

    closePopup(data) {
        if (this.closePopupResolver) {
            this.closePopupResolver(data);
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
                    popup: {
                        show: false,
                        transparent: true
                    }
                });
            }, 300);
        } else {
            console.warn('There is no active popup')
        }
    }

    openPopup() {
        return new Promise((resolve, reject) => {
            if (this.state.popup.show === false && this.getPopupTemplate) {
                this.setState({
                    popupComponent:
                        <Popup onPopupClose={this.closePopup.bind(this)} template={this.getPopupTemplate.bind(this)}/>,
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
                this.closePopupResolver = resolve.bind(this);
            } else if (this.getPopupTemplate) {
                console.warn('Popup opening try has been observed and cancelled');
                reject();
            } else {
                console.warn('Trying to open popup without template setting');
                reject();
            }
        });
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
        return <div className={`App-body-page-popup ${this.getLoadingClassName(this.state.popup, 'App-body-page-popup')}`}>
            {this.state.popupComponent}
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