import React, {Component} from "react";

export class GraphView extends Component {
    render () {
        return (
            <div className="view-wrapper">
                <svg className="graph">

                </svg>
                <div className="graph-controls-wrapper" />
            </div>
        )
    }
}