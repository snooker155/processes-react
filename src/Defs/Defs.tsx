import React, {Component} from 'react';
import {BackgroundPattern} from "../Background__Pattern";

type IDefsProps = {
    gridSpacing?: number;
    gridDotSize?: number;
    edgeArrowSize?: number;
    nodeTypes?: any; // TODO: define nodeTypes, nodeSubtypes, and edgeTypes. Must have shape and shapeId!
    nodeSubtypes?: any;
    edgeTypes?: any;
    renderDefs?: () => any | null;
};

type IDefsState = {
    graphConfigDefs: any;
};

export class Defs extends Component<IDefsProps, IDefsState> {

    static defaultProps = {
        gridDotSize: 2,
        renderDefs: () => null
    };

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        const graphConfigDefs: any = [];
        Defs.processGraphConfigDefs(nextProps.nodeTypes, graphConfigDefs);
        Defs.processGraphConfigDefs(nextProps.nodeSubtypes, graphConfigDefs);
        Defs.processGraphConfigDefs(nextProps.edgeTypes, graphConfigDefs);

        return {
            graphConfigDefs
        };
    }

    static processGraphConfigDefs(typesObj: any | object, graphConfigDefs: any) {
        if(typesObj) {
            Object.keys(typesObj).forEach((type) => {
                const safeId = typesObj[type].shapeId ? typesObj[type].shapeId.replace('#', '') : 'graphdef';
                graphConfigDefs.push(React.cloneElement(typesObj[type].shape, {key: `${safeId}-${graphConfigDefs.length + 1}`}));
            });
        }
    }

    constructor(props: IDefsProps) {
        super(props);
        this.state = {
            graphConfigDefs: []
        };
    }

    render() {
        const { edgeArrowSize, gridSpacing, gridDotSize } = this.props;
        return (
            <defs>
                {this.state.graphConfigDefs}

                {/*<ArrowheadMarker edgeArrowSize={edgeArrowSize} />*/}

                <BackgroundPattern gridSpacing={gridSpacing} gridDotSize={gridDotSize} />

                {/*<DropshadowFilter />*/}

                {this.props.renderDefs && this.props.renderDefs()}
            </defs>
        );
    }
}