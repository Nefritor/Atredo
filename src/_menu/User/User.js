import React from 'react';
import {StateTimeoutSwitch} from 'components/StateChanger/StateChanger';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.userData = props.userData;
        this.signInHandler = props.signInHandler;
        this.registerHandler = props.registerHandler;
        this.logOutHandler = props.logOutHandler;
        this.messageHandler = props.messageHandler;
        this.state = {
            inputs: {},
            highlights: {
                email: false,
                password: false
            },
            hideInputs: true,
            guestState: 0,
            guestButtonsOptions: {
                left: {
                    caption: 'Вход',
                    action: 'openSignIn'
                },
                right: {
                    caption: 'Регистрация',
                    action: 'openRegister'
                }
            },
            guestTitleCaption: 'Гость'
        }
    }

    _setSigningInState() {
        this.setState({
            guestState: 1,
            guestTitleCaption: 'Вход'
        });
        clearTimeout(this.guestStateTimeout);
        this.guestStateTimeout = setTimeout(() => {
            this.setState({
                inputs: {},
                hideInputs: false,
                guestButtonsOptions: {
                    left: {
                        caption: 'Войти',
                        action: 'fetchSignIn'
                    },
                    right: {
                        caption: 'Отмена',
                        action: 'openInit'
                    }
                }
            });
        }, 10);
    }

    _setRegistrationState() {
        this.setState({
            guestState: 2,
            guestTitleCaption: 'Регистрация'
        });
        clearTimeout(this.guestStateTimeout);
        this.guestStateTimeout = setTimeout(() => {
            this.setState({
                inputs: {},
                hideInputs: false,
                guestButtonsOptions: {
                    left: {
                        caption: 'Зарегистрироваться',
                        action: 'fetchRegister'
                    },
                    right: {
                        caption: 'Отмена',
                        action: 'openInit'
                    }
                }
            });
        }, 10);
    }

    _setInitialState() {
        this.setState({
            guestTitleCaption: 'Гость',
            inputs: {},
            hideInputs: true,
            guestButtonsOptions: {
                left: {
                    caption: 'Вход',
                    action: 'openSignIn'
                },
                right: {
                    caption: 'Регистрация',
                    action: 'openRegister'
                }
            }
        });
        clearTimeout(this.guestStateTimeout);
        this.guestStateTimeout = setTimeout(()=> {
            this.setState({
                guestState: 0
            });
        }, 300);
    }

    _handleClick(type) {
        switch (type) {
            case 'openSignIn':
                this._setSigningInState();
                break;
            case 'openRegister':
                this._setRegistrationState();
                break;
            case 'openInit':
                this._setInitialState();
                break;
            case 'fetchSignIn':
                this.signInHandler(this.state.inputs).then((data) => {
                    if (data.message) {
                        this.messageHandler(data.message);
                    }
                    if (data.success) {
                        this._setInitialState();
                    }
                });
                break;
            case 'fetchRegister':
                this.registerHandler(this.state.inputs).then((response) => {
                    const data = {
                        fields: null,
                        message: '',
                        ...response
                    };
                    const responseMessagePromise = this.messageHandler(data.message);
                    if (data.fields) {
                        this._highlightInputs(data.fields);
                    } else {
                        responseMessagePromise.then(() => {
                            this._setInitialState();
                        });
                    }
                });
                break;
            case 'logOut':
                this.logOutHandler();
                break;
            default:
                break;
        }
    }

    _highlightInputs(inputs) {
        return StateTimeoutSwitch(
            this.setState.bind(this),
            ['highlights'],
            [[{
                ...this.state.highlights,
                ...inputs.reduce((a, v) => {
                    return {...a, [v]: true}
                }, {})
            }, {
                ...this.state.highlights,
                ...inputs.reduce((a, v) => {
                    return {...a, [v]: false}
                }, {})
            }]],
            1000
        );
    }

    _getInputValue(inputName) {
        return this.state.inputs[inputName] || '';
    }

    _inputValueChange(inputName, event) {
        this.setState({
            inputs: {
                ...this.state.inputs,
                [inputName]: event.target.value
            }
        })
    }

    getInputs() {
        return (
            <div className={'User-guest-input-wrapper' + (this.state.hideInputs ? ' hidden' : '')}>
                {this.state.responseMessage && <span>{this.state.responseMessage}</span>}
                <div className='User-guest-input-line'>
                    <span className='User-guest-input-line-text'>Эл. почта</span>
                    <input className={'User-guest-input' + (this.state.highlights.email ? ' highlight' : '')}
                           type='email'
                           value={this._getInputValue('email')}
                           onChange={this._inputValueChange.bind(this, 'email')}/>
                </div>
                <div className='User-guest-input-line'>
                    <span className='User-guest-input-line-text'>Пароль</span>
                    <input className={'User-guest-input' + (this.state.highlights.password ? ' highlight' : '')}
                           type='password'
                           value={this._getInputValue('password')}
                           onChange={this._inputValueChange.bind(this, 'password')}/>
                </div>
            </div>
        );
    }

    getUserRender() {
        return (
            <div className="User-wrapper initial">
                <div className="User-title">{this.props.userData.email}</div>
                <div className='User-button-wrapper'>
                    <div className="User-button buttonOK"
                         onClick={this._handleClick.bind(this, 'logOut')}>
                        Выйти
                    </div>
                </div>
            </div>
        );
    }

    getGuestRender() {
        return (
            <div className={'User-wrapper' + (this.state.guestState === 0 || this.state.hideInputs ? ' initial' : '')}>
                <div className='User-title'>
                    {this.state.guestTitleCaption}
                </div>
                {this.state.guestState !== 0 && this.getInputs()}
                <div className='User-button-wrapper'>
                    <div className="User-button buttonOK"
                         onClick={this._handleClick.bind(this, this.state.guestButtonsOptions.left.action)}>
                        {this.state.guestButtonsOptions.left.caption}
                    </div>
                    <div className={'User-button' + (this.state.guestButtonsOptions.right.action !== 'openRegister' ? ' buttonCancel' : ' buttonOK')}
                         onClick={this._handleClick.bind(this, this.state.guestButtonsOptions.right.action)}>
                        {this.state.guestButtonsOptions.right.caption}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className='User'>
                {this.props.userData._id ? this.getUserRender() : this.getGuestRender()}
            </div>
        )
    }
}