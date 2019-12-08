import React from 'react';
import {OperationRPC} from 'rpc';

export default class Object extends React.Component {
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
        OperationRPC.getObject(id).then((data) => {
            if (data) {
                this.setState({
                    object: data,
                    id: this.props.id
                });
            } else {
                this.inCorrectData = true;
            }
        })
    }

    render() {
        return (
            this.props.id !== -1 && !this.inCorrectData?
                this.state && this.state.id !== -1 ?
                    <div className="Object">
                        {this.state.object &&
                        <div className="Object-container">
                            <div className="Object-container-type">
                                Объект
                            </div>
                            <div className="Object-container-title">
                                {this.state.object.title}
                            </div>
                        </div>
                        }
                    </div>
                    :
                    <div className="Object-loading">
                        Загрузка
                    </div>
                :
                <div className="Object-EmptyData ProjectStage-operation-container-activeArea"
                     onClick={this.openSelector}>
                    Выбрать объект
                </div>
        )
    }
}