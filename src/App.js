import React, {Component} from 'react';
import * as PagesLib from './page'
import ErrorPage from './components/ErrorPage';

export default class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageComponent: this._exportFromLib(PagesLib, props.pageName),
            pageConfig: props.pageConfig
        }
    };

    asyncChangePage(pageName, asyncFunction) {
        new Promise((resolve => {
            asyncFunction(resolve);
        })).then(result => {
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

    render() {
        const [PageComponent, PageConfig] = this._getPageData();
        return (
            <div className="App">
                <div className="App-body">
                    <div className="App-body-navBar">
                        
                    </div>
                    <div className="App-body-page">
                        <PageComponent config={PageConfig} pageChange={this.asyncChangePage.bind(this)} />
                    </div>
                </div>
                <div className="App-menu">

                </div>
            </div>
        );
    }
}