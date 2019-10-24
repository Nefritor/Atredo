import React from 'react';
import './Main.css'
import Scrollbar from 'react-scrollbars-custom';
import {ReactComponent as ImagePlus} from '../../lib/plus.svg';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.config = props.config;
        this.pageChange = props.pageChange.bind(this);
    }

    render() {
        return (
            <div className="Main">
                <Scrollbar style={{ width: '100%', height: '100%' }}>
                    <div className="Main-scrollContainer">
                        {this.config.projects.map((project) =>
                            <div key={project.key} className="Main-project">
                                <div className="Main-project-title" title={project.title}>{project.title}</div>
                                <div className="Main-project-description">{project.description}</div>
                            </div>
                        )}
                        <div className="Main-project Main-project-image">
                            <ImagePlus className="Main-project-image-plus"/>
                        </div>
                    </div>
                </Scrollbar>
            </div>
        )
    }
}