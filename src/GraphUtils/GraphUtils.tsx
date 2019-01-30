import {INode} from "../GraphVertexView";
import {IEdge} from "../GraphEdgeView";

export type INodeMapNode = {
    node: INode;
    originalArrIndex: number;
    incomingEdges: IEdge[];
    outgoingEdges: IEdge[];
    parents: INode[];
    children: INode[];
};

export class GraphUtils {
    static getNodesMap(arr: INode[], key: string) {
        const map = {};
        let item = null;
        for (let i = 0; i < arr.length; i++){
            item = arr[i];
            map[`key-${item[key]}`] = {
                children: [],
                incomingEdges: [],
                node: item,
                originalArrIndex: i,
                outgoingEdges: [],
                parents: []
            };
        }
        return map;
    }

    static getEdgesMap(arr: IEdge[]) {
        const map = {};
        let item = null;
        for (let i = 0; i < arr.length; i++){
            item = arr[i];
            if (!item.target) {
                continue;
            }
            map[`${item.source || ''}_${item.target}`] = {
                edge: item,
                originalArrIndex: i
            };
        }
        return map;
    }

    static linkNodesAndEdges(nodesMap: any, edges: IEdge[]) {
        let nodeMapSourceNode = null;
        let nodeMapTargetNode = null;
        let edge = null;
        for (let i = 0; i < edges.length; i++){
            edge = edges[i];
            if (!edge.target) {
                continue;
            }
            nodeMapSourceNode = nodesMap[`key-${edge.source || ''}`];
            nodeMapTargetNode = nodesMap[`key-${edge.target}`];
            // avoid an orphaned edge
            if (nodeMapSourceNode && nodeMapTargetNode) {
                nodeMapSourceNode.outgoingEdges.push(edge);
                nodeMapTargetNode.incomingEdges.push(edge);
                nodeMapSourceNode.children.push(nodeMapTargetNode);
                nodeMapTargetNode.parents.push(nodeMapSourceNode);
            }
        }
    }

    static removeElementFromDom(id: string) {
        const container = document.getElementById(id);
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
            return true;
        }
        return false;
    }

    static findParent(element: any, selector: string) {
        if (element && element.matches && element.matches(selector)) {
            return element;
        } else if (element && element.parentNode) {
            return GraphUtils.findParent(element.parentNode, selector);
        }
        return null;
    }

    static classNames(...args: any[]) {
        let className = '';
        for (const arg of args) {
            if (typeof arg === 'string' || typeof arg === 'number') {
                className += ` ${arg}`;
            } else if (typeof arg === 'object' && !Array.isArray(arg) && arg !== null) {
                Object.keys(arg).forEach((key) => {
                    if (Boolean(arg[key])) {
                        className += ` ${key}`;
                    }
                });
            } else if (Array.isArray(arg)) {
                className += ` ${arg.join(' ')}`;
            }
        }

        return className.trim();
    }

    static yieldingLoop(count, chunksize, callback, finished) {
        var i = 0;
        (function chunk() {
            var end = Math.min(i + chunksize, count);
            for (; i < end; ++i) {
                callback.call(null, i);
            }
            if (i < count) {
                setTimeout(chunk, 0);
            } else {
                finished && finished.call(null);
            }
        })();
    }

    static hasNodeShallowChanged(prevNode, newNode) {
        const prevNodeKeys = Object.keys(prevNode);
        const newNodeKeys = Object.keys(prevNode);
        const checkedKeys = {};
        for (let i = 0; i < prevNodeKeys.length; i++){
            const key = prevNodeKeys[i];
            if (!newNode.hasOwnProperty(key) || prevNode[key] !== newNode[key]) {
                return true;
            }
            checkedKeys[key] = true;
        }
        for (let i = 0; i < newNodeKeys.length; i++){
            const key = newNodeKeys[i];
            if (checkedKeys[key]) {
                continue;
            }
            if (!prevNode.hasOwnProperty(key) || prevNode[key] !== newNode[key]) {
                return true;
            }
        }
        return false;
    }
}