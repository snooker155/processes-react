import * as React from 'react';
import {INode} from "../GraphVertexView";
import {GraphUtils} from "../GraphUtils";

type INodeTextProps = {
    data: INode;
    nodeTypes: any; // TODO: create a nodeTypes interface
    isSelected: boolean;
}

export class NodeText extends React.Component<INodeTextProps> {
    getTypeText(data: INode, nodeTypes: any) {
        if (data.type && nodeTypes[data.type]) {
            return nodeTypes[data.type].typeText;
        } else if (nodeTypes.emptyNode) {
            return nodeTypes.emptyNode.typeText;
        } else {
            return null;
        }
    }

    render() {
        const { data, nodeTypes, isSelected } = this.props;
        const lineOffset = 18;
        const title = data.title;
        const className = GraphUtils.classNames('node-text', { selected: isSelected });
        const typeText = this.getTypeText(data, nodeTypes);

        return (
            <text className={className} textAnchor="middle">
                {!!typeText && (
                    <tspan opacity="0.5">{typeText}</tspan>
                )}
                {title && (
                    <tspan x={0} dy={lineOffset} fontSize="10px">
                        {title}
                    </tspan>
                )}
                {title && <title>{title}</title>}
            </text>
        );
    }
}