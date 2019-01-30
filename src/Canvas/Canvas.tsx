import React, {Component} from 'react';
import {Defs} from "../Defs";
import {Background} from "../Background";

// import { type LayoutEngineType } from '../utilities/layout-engine/layout-engine-types';
// import { type IEdge, type ITargetPosition } from './edge';
// import { type INode } from './node';

export type IGraphViewProps = {
    backgroundFillId?: string;
    // edges: any[];
    // edgeArrowSize?: number;
    // edgeHandleSize?: number;
    // edgeTypes: any;
    gridDotSize?: number;
    gridSize?: number;
    gridSpacing?: number;
    // layoutEngineType?: LayoutEngineType;
    // maxTitleChars?: number;
    // maxZoom?: number;
    // minZoom?: number;
    // nodeKey: string;
    // nodes: any[];
    // nodeSize?: number;
    // nodeSubtypes: any;
    // nodeTypes: any;
    // readOnly?: boolean;
    // selected: any;
    // showGraphControls?: boolean;
    // zoomDelay?: number;
    // zoomDur?: number;
    // canCreateEdge?: (startNode?:INode, endNode?:INode) => boolean;
    // canDeleteEdge?: (selected: any) => boolean;
    // canDeleteNode?: (selected: any) => boolean;
    // onCopySelected?: () => void;
    // onCreateEdge: (sourceNode: INode, targetNode: INode) => void;
    // onCreateNode: (x: number, y: number) => void;
    // onDeleteEdge: (selectedEdge: IEdge, edges: IEdge[]) => void;
    // onDeleteNode: (selected: any, nodeId: string, nodes: any[]) => void;
    // onPasteSelected?: () => void;
    // onSelectEdge: (selectedEdge: IEdge) => void;
    // onSelectNode: (node: INode | null) => void;
    // onSwapEdge: (sourceNode: INode, targetNode: INode, edge: IEdge) => void;
    // onUndo?: () => void;
    // onUpdateNode: (node: INode) => void;
    renderBackground?: (gridSize?: number) => any;
    renderDefs?: () => any;
    // renderNode?: (
    //     nodeRef: any,
    //     data: any,
    //     id: string,
    //     selected: boolean,
    //     hovered: boolean
    // ) => any;
    // afterRenderEdge?: (id: string, element: any, edge: IEdge, edgeContainer: any, isEdgeSelected: boolean) => void;
    // renderNodeText?: (data: any, id: string | number, isSelected: boolean) => any;
};

type IViewTransform = {
    k: number,
    x: number,
    y: number
}

type IGraphViewState = {
    // viewTransform?: IViewTransform;
    // hoveredNode: boolean;
    // nodesMap: any;
    // edgesMap: any;
    // nodes: any[];
    // edges: any[];
    // selectingNode: boolean;
    // hoveredNodeData: INode | null;
    // edgeEndNode: INode | null;
    // draggingEdge: boolean;
    // draggedEdge: any;
    // componentUpToDate: boolean;
    // selectedEdgeObj: any;
    // selectedNodeObj: any;
    // documentClicked: boolean;
    // svgClicked: boolean;
    // focused: boolean;
};

class Canvas extends Component<IGraphViewProps, IGraphViewState> {
    viewBox = [window.innerWidth / -2, window.innerHeight / -2, window.innerWidth, window.innerHeight].join();

    static defaultProps = {
        // canCreateEdge: (startNode?:INode, endNode?:INode) => true,
        // canDeleteEdge: () => true,
        // canDeleteNode: () => true,
        // edgeArrowSize: 8,
        gridSpacing: 36,
        // layoutEngineType: 'None',
        // maxTitleChars: 9,
        // maxZoom: 1.5,
        // minZoom: 0.15,
        // nodeSize: 154,
        // readOnly: false,
        // showGraphControls: true,
        // zoomDelay: 1000,
        // zoomDur: 750
    };

    nodeTimeouts: any;
    edgeTimeouts: any;
    renderNodesTimeout: any;
    renderEdgesTimeout: any;
    // zoom: any;
    viewWrapper: React.RefObject<HTMLDivElement>;
    graphSvg: React.RefObject<SVGElement>;
    // entities: any;
    // selectedView: any;
    view: any;
    graphControls: any;
    // layoutEngine: any;

    constructor(props: IGraphViewProps) {
        super(props);

        this.nodeTimeouts = {};
        this.edgeTimeouts = {};
        this.renderNodesTimeout = null;
        this.renderEdgesTimeout = null;
        this.viewWrapper = React.createRef();
        this.graphControls = React.createRef();
        this.graphSvg = React.createRef();

        // if (props.layoutEngineType) {
        //     this.layoutEngine = new LayoutEngines[props.layoutEngineType](props);
        // }

        this.state = {
            componentUpToDate: false,
            draggedEdge: null,
            draggingEdge: false,
            edgeEndNode: null,
            edges: [],
            edgesMap: {},
            hoveredNode: false,
            hoveredNodeData: null,
            nodes: [],
            nodesMap: {},
            selectedEdgeObj: null,
            selectedNodeObj: null,
            selectingNode: false,
            documentClicked: false,
            svgClicked: false,
            focused: true
        };
    }

    componentDidMount() {
        // // TODO: can we target the element rather than the document?
        // document.addEventListener('keydown', this.handleWrapperKeydown);
        // document.addEventListener('click', this.handleDocumentClick);
        //
        // this.zoom = d3
        //     .zoom()
        //     .filter(this.zoomFilter)
        //     .scaleExtent([this.props.minZoom || 0, this.props.maxZoom || 0])
        //     .on('start', this.handleZoomStart)
        //     .on('zoom', this.handleZoom)
        //     .on('end', this.handleZoomEnd);
        //
        // d3
        //     .select(this.viewWrapper.current)
        //     .on('touchstart', this.containZoom)
        //     .on('touchmove', this.containZoom)
        //     .on('click', this.handleSvgClicked) // handle element click in the element components
        //     .select('svg')
        //     .call(this.zoom);
        //
        // this.selectedView = d3.select(this.view);

        // On the initial load, the 'view' <g> doesn't exist until componentDidMount.
        // Manually render the first view.
        this.renderView();

        // setTimeout(() => {
        //     if (this.viewWrapper != null) {
        //         this.handleZoomToFit();
        //     }
        // }, this.props.zoomDelay);
    }

    // Renders 'graph' into view element
    renderView() {
        // Update the view w/ new zoom/pan
        // this.selectedView.attr('transform', this.state.viewTransform);

        clearTimeout(this.renderNodesTimeout);
        // this.renderNodesTimeout = setTimeout(this.renderNodes);
    }

    renderBackground = () => {
        const { gridSize, backgroundFillId, renderBackground } = this.props;
        if (renderBackground) {
            return renderBackground(gridSize);
        } else {
            return <Background gridSize={gridSize} backgroundFillId={backgroundFillId} />;
        }
    }

    render() {
        const {
            // edgeArrowSize,
            // gridSpacing,
            // gridDotSize,
            // nodeTypes,
            // nodeSubtypes,
            // edgeTypes,
            renderDefs
        } = this.props;

        return (
            <div
                className="view-wrapper"
                ref={this.viewWrapper}
            >
                <svg
                    id="processes-react"
                    // Cause error
                    // preserveAspectRatio="xMaxYMax none"
                    viewBox={this.viewBox}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <Defs
                        gridDotSize={2}
                        gridSpacing={36}
                        renderDefs={renderDefs}
                    />
                    {/*<circle cx={0} cy={0} r={50} />*/}
                    {/*<circle cx={50}  cy={50} r={50} fill={"url(#grid)"}/>*/}
                    {/*<circle cx={180} cy={50} r={40} fill={"none"} strokeWidth={20} stroke={"url(#grid)"}/>*/}
                    <g className="view" ref={(el) => (this.view = el)}>
                        {this.renderBackground()}

                        {/*<g className="entities" ref={(el) => (this.entities = el)}/>*/}
                    </g>
                </svg>
            </div>
        );
    }
};

export default Canvas;