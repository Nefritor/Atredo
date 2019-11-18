import React from 'react';
import Base from '../Base';
import Scrollbar from 'react-scrollbars-custom';
import ProjectStage from 'components/ProjectStage/ProjectStage';
import {ReactComponent as ImagePlus} from 'lib/plus.svg';
import './Constructor.css';

export default class Constructor extends Base {
    getData(config, resolve) {
        setTimeout(() => {
            resolve({
                stages: [
                    {
                        key: 0,
                        title: 'Заморозка',
                        operations: [
                            {
                                key: 0,
                                title: 'Открываем холодильник',
                                description: 'Это такое описание очень и очень длинное. Надеюсь тебе оно нравится, ибо будешь кушать соплю. Это такое описание очень и очень длинное. Надеюсь тебе оно нравится, ибо будешь кушать соплю. Это такое описание очень и очень длинное. Надеюсь тебе оно нравится, ибо будешь кушать соплю.',
                                actor: -1,
                                object: -1,
                                action: -1
                            },
                            {
                                key: 1,
                                title: 'Кладем в холодильник',
                                description: 'И это тоже описание',
                                actor: -1,
                                object: -1,
                                action: -1
                            }
                        ]
                    },
                    {
                        key: 1,
                        title: 'Разморозка',
                        operations: []
                    }
                ]
            });
            this.setState({
                navBarActions: this.getNavBarActions()
            });
        }, 300)
    }

    getNavBarActions() {
        return <div className="App-body-navBar-actions-addButton"><ImagePlus/></div>;
    }

    getRender() {
        return (
            <div className="Constructor">
                <Scrollbar style={{width: '100%', height: '100%'}}>
                    <div className="Constructor-scrollContainer">
                        <div className="Constructor-stagesLine">
                            {this.pageData.stages.map((stage) =>
                                <ProjectStage key={stage.key}
                                              stageData={stage}
                                              popupHandlers={this.popupHandlers.bind(this)}
                                              loadingHandlers={this.loadingHandlers.bind(this)}/>
                            )}
                        </div>
                    </div>
                </Scrollbar>
            </div>
        )
    }
}