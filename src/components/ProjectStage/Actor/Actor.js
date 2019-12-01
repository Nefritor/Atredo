import React from 'react';
import {OperationRPC} from 'rpc';
import './Actor.css';

export default class Actor extends React.Component {
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
        OperationRPC.getActor(id).then((data) => {
            this.setState({
                actor: data,
                id: this.props.id
            });
        })
    }

    render() {
        return (
            this.props.id !== -1 ?
                this.state && this.state.id !== -1 ?
                    <div className="Actor">
                        {this.state.actor &&
                        <div>
                            {this.state.actor.title}
                        </div>
                        }
                    </div>
                    :
                    <div>
                        Загрузка
                    </div>
                :
                <div className="Actor-EmptyData ProjectStage-operation-container-activeArea"
                     onClick={this.openSelector}>
                    Выбрать исполнителя
                </div>
        )
    }
}