import React, {Component} from 'react';
import * as PagesLib from './page'
import ErrorPage from './components/ErrorPage';
import {ReactComponent as LoadingAnimation} from './lib/loading.svg';

export default class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageComponent: this._exportFromLib(PagesLib, props.pageName),
            pageConfig: props.pageConfig,
            loading: false,
            loadingTransparent: true
        }
    };

    asyncChangePage(pageName, asyncFunction) {
        let loadingTimeout;
        new Promise(resolve => {
            this.setState({loading: true});
            loadingTimeout = setTimeout(() => {
                this.setState({loadingTransparent: false});
            }, 0);
            asyncFunction(resolve);
        }).then(result => {
            clearTimeout(loadingTimeout);
            this.setState({loadingTransparent: true});
            setTimeout(() => {
                this.setState({loading: false});
            }, 300);
            this._changePage(pageName, result)
        });
    };

    _changePage(pageName, pageConfig) {
        const pageComponent = this._exportFromLib(PagesLib, pageName);
        const newState = {
            pageComponent: pageComponent ? pageComponent : ErrorPage,
            pageConfig: pageComponent ? pageConfig : {moduleName: pageName}
        };
        this.setState(newState);
    };

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

    _getMaskClassName() {
        if (this.state.loading) {
            if (this.state.loadingTransparent) {
                return 'App-body-page-mask-transparent'
            } else {
                return 'App-body-page-mask-loading';
            }
        } else {
            return 'App-body-page-mask-hidden';
        }
    }

    render() {
        const [PageComponent, PageConfig] = this._getPageData();
        return (
            <div className="App">
                <div className="App-body">
                    <div className="App-body-navBar">
                    </div>
                    <div className="App-body-page">
                        <div className={this._getMaskClassName()}>
                            <LoadingAnimation className="App-body-page-loadingAnimation"/>
                        </div>
                        <PageComponent config={PageConfig} pageChange={this.asyncChangePage.bind(this)}/>
                    </div>
                </div>
                <div className="App-menu">

                </div>
            </div>
        );
    }
}