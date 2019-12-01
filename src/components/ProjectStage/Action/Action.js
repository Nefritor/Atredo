import React from 'react';
import {OperationRPC} from 'rpc';
import './Action.css';

export default class Action extends React.Component {
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
        OperationRPC.getAction(id).then((data) => {
            this.setState({
                action: data,
                id: this.props.id
            });
        })
    }

    render() {
        return (
            this.props.id !== -1 ?
                this.state && this.state.id !== -1 ?
                    <div className="Action">
                        {this.state.action &&
                        <div>
                            {this.state.action.title}
                        </div>
                        }
                    </div>
                    :
                    <div>
                        Загрузка
                    </div>
                :
                <div className="Action-EmptyData ProjectStage-operation-container-activeArea"
                     onClick={this.openSelector}>
                    Выбрать действие
                </div>
        )
    }
}