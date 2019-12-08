import React from 'react';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.template = props.template;
        this.popupDataChange = props.popupDataChange;
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