import React from 'react';
import {OperationRPC} from 'rpc';
import './Object.css';

export default class Object extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.openSelector = props.openSelector.bind(this);
        OperationRPC.getObject(this.id).then((data) => {
            this.setState({
                object: data
            });
        })
    }

    render() {
        return (
            this.id !== -1 ?
                <div className="Object">
                    {this.state.object ?
                        <div>
                            Загрузка
                        </div>
                        :
                        <div>
                            {this.state.object.name}
                        </div>
                    }
                </div>
                :
                <div className="Object-EmptyData ProjectStage-operation-container-activeArea" onClick={this.openSelector}>
                    Выбрать объект
                </div>
        )
    }
}