import React from 'react';
import {OperationRPC} from 'rpc';

export default class Actor extends React.Component {
    constructor(props) {
        super(props);
        this.openSelector = props.openSelector.bind(this);
        this.inCorrectData = false;
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
            if (data) {
                this.setState({
                    actor: data,
                    id: data ? this.props.id : -1
                });
            } else {
                this.inCorrectData = true;
            }
        })
    }

    render() {
        return (
            this.props.id !== -1 && !this.inCorrectData ?
                this.state && this.state.id !== -1 ?
                    <div className="Actor">
                        {this.state.actor &&
                        <div className="Actor-container">
                            <div className="Actor-container-type">
                                Исполнитель
                            </div>
                            <div className="Actor-container-title">
                                {this.state.actor.title}
                            </div>
                        </div>
                        }
                    </div>
                    :
                    <div className="Actor-loading">
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