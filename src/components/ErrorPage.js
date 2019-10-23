import React from 'react';

export default class ErrorPage extends React.Component {
    render() {
        return (
            <div className="ErrorPage-body">
                You are trying to load unknown page "{this.props.config.moduleName}"
            </div>
        )
    }
}