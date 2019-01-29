import { IGraphVertex } from "./IGraphVertex";
import { LinkedList, LinkedListNode } from "../LinkedList";
import { GraphEdge } from "../GraphEdge";
import { AbstractVertexType } from "./AbstractVertexType";

export class GraphVertex<VertexType extends AbstractVertexType> implements IGraphVertex<VertexType> {
    value: VertexType;
    edges: LinkedList<GraphEdge<VertexType>>;

    /**
     * @param {*} value
     */
    constructor(value: VertexType) {
        if (value === undefined) {
            throw new Error('Graph vertex must have a value');
        }

        /**
         * @param {GraphEdge} edgeA
         * @param {GraphEdge} edgeB
         */
        const edgeComparator = (edgeA: GraphEdge<VertexType>, edgeB: GraphEdge<VertexType>): number => {
            if (edgeA.getKey() === edgeB.getKey()) {
                return 0;
            }

            return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
        };

        // Normally you would store string value like vertex name.
        // But generally it may be any object as well
        this.value = value;
        this.edges = new LinkedList<GraphEdge<VertexType>>(edgeComparator);
    }

    /**
     * @param {GraphEdge} edge
     * @returns {GraphVertex}
     */
    addEdge(edge: GraphEdge<VertexType>): GraphVertex<VertexType> {
        this.edges.append(edge);

        return this;
    }

    /**
     * @param {GraphEdge} edge
     */
    deleteEdge(edge: GraphEdge<VertexType>): void {
        this.edges.delete(edge);
    }

    /**
     * @returns {GraphVertex[]}
     */
    getNeighbors(): GraphVertex<VertexType>[] {
        const edges = this.edges.toArray();

        /** @param {LinkedListNode} node */
        const neighborsConverter = (node: LinkedListNode<GraphEdge<VertexType>>) => {
            return node.value.startVertex === this ? node.value.endVertex : node.value.startVertex;
        };

        // Return either start or end vertex.
        // For undirected graphs it is possible that current vertex will be the end one.
        return edges.map(neighborsConverter);
    }

    /**
     * @return {GraphEdge[]}
     */
    getEdges(): GraphEdge<VertexType>[] {
        return this.edges.toArray().map(linkedListNode => linkedListNode.value);
    }

    /**
     * @return {number}
     */
    getDegree(): number {
        return this.edges.toArray().length;
    }

    /**
     * @param {GraphEdge} requiredEdge
     * @returns {boolean}
     */
    hasEdge(requiredEdge: GraphEdge<VertexType>): boolean {
        const edgeNode = this.edges.find({
            callback: edge => edge === requiredEdge,
        });

        return !!edgeNode;
    }

    /**
     * @param {GraphVertex} vertex
     * @returns {boolean}
     */
    hasNeighbor(vertex: GraphVertex<VertexType>): boolean {
        const vertexNode = this.edges.find({
            callback: edge => edge.startVertex === vertex || edge.endVertex === vertex,
        });

        return !!vertexNode;
    }

    /**
     * @param {GraphVertex} vertex
     * @returns {(GraphEdge|null)}
     */
    findEdge(vertex: GraphVertex<VertexType>): (GraphEdge<VertexType> | null) {
        const edgeFinder = (edge: GraphEdge<VertexType>) => {
            return edge.startVertex === vertex || edge.endVertex === vertex;
        };

        const edge = this.edges.find({ callback: edgeFinder });

        return edge ? edge.value : null;
    }

    /**
     * @returns {string}
     */
    getKey(): string {
        return typeof(this.value) === 'string' ? this.value : this.value.getKey();
    }

    /**
     * @return {GraphVertex}
     */
    deleteAllEdges(): GraphVertex<VertexType> {
        this.getEdges().forEach(edge => this.deleteEdge(edge));

        return this;
    }

    /**
     * @param {function} [callback]
     * @returns {string}
     */
    toString(callback: (value: any) => string): string {
        return callback ? callback(this.value) : `${this.value}`;
    }
}