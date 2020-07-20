import React from 'react';
import * as PagesLib from 'page'
import {User} from 'menu';
import {decode} from 'jsonwebtoken';
import ErrorPage from 'components/ErrorPage/ErrorPage';
import {ReactComponent as BackIcon} from 'lib/back.svg';
import {UserRPC} from "rpc";
import {StateTimeoutSwitch} from "components/StateChanger/StateChanger";

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageComponent: this._exportFromLib(PagesLib, props.startPage),
            pageConfig: props.config,
            route: [{
                page: props.startPage,
                config: props.config
            }],
            title: props.config.title,
            userData: props.userData ? decode(props.userData) : {},
            message: '',
            messageType: 'default'
        }
    };

    _pageChange(pageName, pageConfig) {
        const route = this.state.route;
        let nextPage = {
            page: pageName,
            config: pageConfig
        };
        if (!pageName) {
            route.pop();
            nextPage = route.pop();
        }
        route.push(nextPage);
        const pageComponent = this._exportFromLib(PagesLib, nextPage.page);
        const newState = {
            pageComponent: pageComponent ? pageComponent : ErrorPage,
            pageConfig: pageComponent ? nextPage.config : {moduleName: nextPage.page}
        };
        this.setState({
            ...newState,
            title: nextPage.config.title
        });
    };

    _goBack() {
        this.setState({
            navBarActions: undefined
        });
        this._pageChange();
    }

    _exportFromLib(lib, module) {
        if (lib.hasOwnProperty(module)) {
            return lib[module];
        } else {
            return false;
        }
    };

    _getPageData() {
        return [
            this.state.pageComponent,
            this.state.pageConfig
        ];
    };

    _setNavBarActions(actions = null) {
        this.setState({
            navBarActions: actions
        })
    }

    _getAppHandlers() {
        return {
            pageChange: this._pageChange.bind(this),
            setNavBarActions: this._setNavBarActions.bind(this)
        }
    }

    _signInHandler(data) {
        return UserRPC.signIn(data).then((response) => {
            const data = {
                token: null,
                message: null,
                ...response
            };
            if (data.token) {
                sessionStorage.setItem('userToken', JSON.stringify(data.token));
                this.setState({
                    userData: decode(data.token)
                });
            }
            return data;
        });
    }

    _registerHandler(data) {
        return UserRPC.register(data);
    }

    _logOutHandler() {
        sessionStorage.removeItem('userToken');
        this.setState({
            userData: {}
        });
    }

    _messageHandler(message, type = 'default') {
        return StateTimeoutSwitch(
            this.setState.bind(this),
            ['message', 'messageType'],
            [[message, null], [type, 'default']],
            2000
        );
    }

    render() {
        const [PageComponent, PageConfig] = this._getPageData();
        return (
            <div className="App-wrapper">
                <div className="App">
                    <div className="App-body">
                        <div className="App-body-navBar">
                            <div className={this.state.route.length > 1 ?
                                'App-body-navBar-backButton' :
                                'App-body-navBar-backButton-hidden'}
                                 onClick={this._goBack.bind(this)}><BackIcon/></div>
                            {this.state.title &&
                            <div className="App-body-navBar-title" title={this.state.title}>{this.state.title}</div>}
                            <div className="App-body-navBar-actions">
                                {this.state.navBarActions}
                            </div>
                        </div>
                        <PageComponent config={PageConfig} appHandlers={this._getAppHandlers()}/>
                    </div>
                    <div className="App-menu">
                        <User userData={this.state.userData}
                              signInHandler={this._signInHandler.bind(this)}
                              registerHandler={this._registerHandler.bind(this)}
                              logOutHandler={this._logOutHandler.bind(this)}
                              messageHandler={this._messageHandler.bind(this)}/>
                    </div>
                </div>
                <div className={"Message " + this.state.messageType}>
                    {this.state.message}
                </div>
            </div>
        );
    }
}