import React from 'react';

export default class OperationsBase extends React.Component {
    constructor(props) {
        super(props);
        this.openSelector = props.openSelector.bind(this);
        this.inCorrectData = false;
        this.rpc = this.operationRPC.bind(this);
        this.captions = this.operationCaptions();
        if (props.id !== -1) {
            this.setData(this.props.id);
        }
    }

    operationRPC() {
        throw Error('RPC of this operation must be declared in child class');
    }

    operationCaptions() {
        throw Error('Caption of this operation must be declared in child class');
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            this.setData(this.props.id);
        }
    }

    setData(id) {
        this.rpc(id).then((data) => {
            if (data) {
                this.setState({
                    operation: data,
                    id: this.props.id
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
                    <div className="Operation">
                        {this.state.operation &&
                        <div className="Operation-container">
                            <div className="Operation-container-type">
                                {this.captions.typeCaption}
                            </div>
                            <div className="Operation-container-title">
                                {this.state.operation.title}
                            </div>
                        </div>
                        }
                    </div>
                    :
                    <div className="Operation-loading">
                        Загрузка
                    </div>
                :
                <div className="Operation-EmptyData ProjectStage-operation-container-activeArea buttonOK"
                     onClick={this.openSelector}>
                    {this.captions.selector}
                </div>
        )
    }
}