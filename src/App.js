import React from 'react';
import * as PagesLib from './page'
import ErrorPage from './components/ErrorPage/ErrorPage';
import {ReactComponent as BackIcon} from './lib/back.svg';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageComponent: this._exportFromLib(PagesLib, props.startPage),
            pageConfig: props.config,
            loading: false,
            loadingTransparent: true,
            route: [{
                page: props.startPage,
                config: props.config
            }],
            title: props.config.title,
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

    render() {
        const [PageComponent, PageConfig] = this._getPageData();
        return (
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

                </div>
            </div>
        );
    }
}