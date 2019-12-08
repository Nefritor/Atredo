import React from 'react';
import {OperationRPC} from 'rpc';

export default class Action extends React.Component {
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
        OperationRPC.getAction(id).then((data) => {
            if (data) {
                this.setState({
                    action: data,
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
                    <div className="Action">
                        {this.state.action &&
                        <div className="Action-container">
                            <div className="Action-container-type">
                                Действие
                            </div>
                            <div className="Action-container-title">
                                {this.state.action.title}
                            </div>
                        </div>
                        }
                    </div>
                    :
                    <div className="Action-loading">
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