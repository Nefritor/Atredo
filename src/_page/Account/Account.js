import React, {Component} from 'react';

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.test = props.config.test;
    }

    render() {
        return (
            <div className="Account">
                {this.test}
            </div>
        )
    }
}