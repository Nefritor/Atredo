import React, {Component} from 'react';
import * as PagesLib from './page'
import ErrorPage from './components/ErrorPage';
import './App.css';

export default class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageComponent: this.exportFromLib(PagesLib, props.pageName),
            pageConfig: props.pageConfig
        }
    };

    changePage = (pageName, pageConfig) => {
        const pageComponent = this.exportFromLib(PagesLib, pageName);
        const newState = {
            pageComponent: pageComponent ? pageComponent : ErrorPage,
            pageConfig: pageComponent ? pageConfig : {moduleName: pageName}
        };
        this.setState(newState);
    };

    asyncChangePage = (pageName, asyncFunction) => {
        new Promise((resolve => {
            asyncFunction(resolve);
        })).then(result => {
            this.changePage(pageName, result)
        });
    };

    exportFromLib = (lib, module) => {
        if (lib.hasOwnProperty(module)) {
            return lib[module];
        } else {
            return false;
        }
    };

    getPageData = () => {
        return [
            this.state.pageComponent,
            this.state.pageConfig
        ];
    };



    openAccount = () => {
        this.asyncChangePage('Account', resolve => {
            setTimeout(() => {
                resolve({ test: 'this is async data' });
            }, 1000);
        })
    };

    render() {
        const [PageComponent, PageConfig] = this.getPageData();
        return (
            <div>
                <div className="App-body">
                    <PageComponent config={PageConfig}/>
                </div>
                <div onClick={() => {
                    this.openAccount();
                }}>Account page
                </div>
                <div onClick={() => {
                    this.changePage('Main', {test: 'Main'})
                }}>Main page
                </div>
            </div>
        );
    }
}