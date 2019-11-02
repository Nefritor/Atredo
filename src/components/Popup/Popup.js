import React from 'react';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.data = props.data;
        this.template = props.template;
    }

    render() {
        const Template = this.template;
        return (
            <div className="Popup">
                <Template/>
            </div>
        );
    }
}