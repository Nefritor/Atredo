import React from 'react';
import Base from '../Base';
import Scrollbar from 'react-scrollbars-custom';
import Popup from 'components/Popup/Popup';
import {MainRPC} from 'rpc';
import {ReactComponent as ImagePlus} from 'lib/plus.svg';
import './Main.css'

export default class Main extends Base {
    getData(config, resolve) {
        MainRPC.getProjectList(config).then((data) => {
            resolve({
                projects: data
            });
        });
    }

    _openConstructor(projectData) {
        this.appHandlers.pageChange('Constructor', {key: projectData.key, title: projectData.title});
    }

    getPopupTemplate() {
        return <div>Жопа</div>;
    }

    getRender() {
        return (
            <div className="Main">
                <Scrollbar style={{width: '100%', height: '100%'}}>
                    <div className="Main-scrollContainer">
                        {this.pageData.projects.map((project) =>
                            <div key={project.key} className="Main-project"
                                 onClick={this._openConstructor.bind(this, project)}>
                                <div className="Main-project-title" title={project.title}>{project.title}</div>
                                <div className="Main-project-description">{project.description}</div>
                            </div>
                        )}
                        <div className="Main-project Main-project-image" onClick={this.openPopup.bind(this)}>
                            <ImagePlus className="Main-project-image-plus"/>
                        </div>
                    </div>
                </Scrollbar>
            </div>
        )
    }
}