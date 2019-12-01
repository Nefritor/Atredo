import React from 'react';
import {OperationRPC} from 'rpc';
import './Object.css';

export default class Object extends React.Component {
    constructor(props) {
        super(props);
        this.openSelector = props.openSelector.bind(this);
        if (props.id !== -1) {
            this.setData(this.props.id);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            this.setData(this.props.id);
        }
    }

    setData(id) {
        OperationRPC.getObject(id).then((data) => {
            this.setState({
                object: data,
                id: this.props.id
            });
        })
    }

    render() {
        return (
            this.props.id !== -1 ?
                this.state && this.state.id !== -1 ?
                    <div className="Object">
                        {this.state.object &&
                        <div className="ProjectStage-operation-container-activeArea-loading">
                            {this.state.object.title}
                        </div>
                        }
                    </div>
                    :
                    <div>
                        Загрузка
                    </div>
                :
                <div className="Object-EmptyData ProjectStage-operation-container-activeArea"
                     onClick={this.openSelector}>
                    Выбрать исполнителя
                </div>
        )
    }
}