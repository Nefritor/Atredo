import React from 'react';
import Base from '../Base';
import Scrollbar from 'react-scrollbars-custom';
import ProjectStage from '../../components/ProjectStage/ProjectStage';
import {ReactComponent as ImagePlus} from "../../lib/plus.svg";
import './Constructor.css';

export default class Constructor extends Base {
    getData(config, resolve) {
        setTimeout(() => {
            resolve({
                stages: [
                    {key: 0, title: 'Заморозка'},
                    {key: 1, title: 'Разморозка'}
                ]
            });
            this.setState({
                navBarActions: this.getNavBarActions()
            });
        }, 300)
    }

    getNavBarActions() {
        return <div className="App-body-navBar-actions-addButton"><ImagePlus /></div>;
    }

    getRender() {
        return (
            <div className="Constructor">
                <Scrollbar style={{width: '100%', height: '100%'}}>
                    <div className="Constructor-scrollContainer">
                        {this.pageData.stages.map((stage) =>
                            <ProjectStage key={stage.key} stageData={stage}/>
                        )}
                    </div>
                </Scrollbar>
            </div>
        )
    }
}