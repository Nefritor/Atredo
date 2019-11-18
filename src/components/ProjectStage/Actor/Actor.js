import React from 'react';
import {OperationRPC} from 'rpc';
import './Actor.css';

export default class Actor extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.openSelector = props.openSelector.bind(this);
        OperationRPC.getActor(this.id).then((data) => {
            this.setState({
                actor: data
            });
        })
    }

    render() {
        return (
            this.id !== -1 ?
                <div className="Actor">
                    {this.state.actor ?
                        <div>
                            Загрузка
                        </div>
                        :
                        <div>
                            {this.state.actor.name}
                        </div>
                    }
                </div>
                :
                <div className="Actor-EmptyData ProjectStage-operation-container-activeArea" onClick={this.openSelector}>
                    Выбрать исполнителя
                </div>
        )
    }
}