import React from 'react';
import {ReactComponent as ImagePlus} from '../../lib/plus.svg';
import './ProjectStage.css';

export default class ProjectStage extends React.Component {
    constructor(props) {
        super(props);
        this.stageData = props.stageData;
    }

    render() {
        return (
            <div className="ProjectStage">
                <div className="ProjectStage-header">
                    <div className="ProjectStage-header-title" title={'Этап: ' + this.stageData.title}>
                        <div className="ProjectStage-header-title-top">Этап</div>
                        <div className="ProjectStage-header-title-bottom">{this.stageData.title}</div>
                    </div>
                </div>
                {this.stageData.actions.map((action) =>
                    <div key={action.key} className="ProjectStage-action">
                        <div className="ProjectStage-action-column-info">
                            <div className="ProjectStage-action-title">{action.title}</div>
                            <div className="ProjectStage-action-description-scrollContainer">
                                <div className="ProjectStage-action-description-content">
                                    {action.description}
                                </div>
                            </div>
                            <div className="ProjectStage-action-bottomInnerShadow"/>
                        </div>
                        <div className="ProjectStage-action-column-interactive">
                            <div className="ProjectStage-action-actor">{action.actor}</div>
                            <div className="ProjectStage-action-action">{action.action}</div>
                            <div className="ProjectStage-action-object">{action.object}</div>
                        </div>
                    </div>
                )}
                <div className="ProjectStage-addTemplate">Добавить</div>
            </div>
        )
    }
}