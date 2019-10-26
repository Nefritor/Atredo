import React from 'react';
import {ReactComponent as LoadingAnimation} from "../lib/loading.svg";

export default class Base extends React.Component {
    constructor(props) {
        super(props);
        this.appHandlers = props.appHandlers;
        this.state = {
            dataReady: false,
            loading: true,
            loadingTransparent: true,
            navBarActions: undefined
        }
    }

    componentWillMount() {
        let loadingTimeout;
        new Promise(resolve => {
            loadingTimeout = setTimeout(() => {
                this.setState({loadingTransparent: false});
            }, 0);
            this.getData(this.props.config, resolve);
        }).then(pageData => {
            this.pageData = pageData;
            clearTimeout(loadingTimeout);
            this.setState({
                loadingTransparent: true,
                dataReady: true
            });
            this.appHandlers.setNavBarActions(this.state.navBarActions);
            setTimeout(() => {
                this.setState({loading: false});
            }, 300);
        })
    }

    getData() {
        throw Error('Data getter must be declared inside child component');
    }

    getRender() {
        throw Error('Renderer must be declared inside child component');
    }

    getMaskClassName() {
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

    getLoader() {
        return <div className={this.getMaskClassName()}>
            <LoadingAnimation className="App-body-page-loadingAnimation"/>
        </div>
    }

    render() {
        return (
            <div className="App-body-page">
                {this.state.dataReady && this.getRender()}
                {this.getLoader()}
            </div>
        )
    }
}