import React from 'react';
import {OperationRPC} from 'rpc';
import './Action.css';

export default class Action extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.openSelector = props.openSelector.bind(this);
        OperationRPC.getAction(this.id).then((data) => {
            this.setState({
                action: data
            });
        })
    }

    render() {
        return (
            this.id !== -1 ?
                <div className="Action">
                    {this.state.action ?
                        <div>
                            Загрузка
                        </div>
                        :
                        <div>
                            {this.state.action.name}
                        </div>
                    }
                </div>
                :
                <div className="Action-EmptyData ProjectStage-operation-container-activeArea" onClick={this.openSelector}>
                    Выбрать действие
                </div>
        )
    }
}