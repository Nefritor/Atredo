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
                    <div className="ProjectStage-header-title" title={this.stageData.title}>
                        <div className="ProjectStage-header-title-top">Этап</div>
                        <div className="ProjectStage-header-title-bottom">{this.stageData.title}</div>
                    </div>
                    <div className="ProjectStage-header-addButton"><ImagePlus/></div>
                </div>
            </div>
        )
    }
}