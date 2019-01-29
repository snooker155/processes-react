import { IGraphEdge } from "./IGraphEdge";
import { IGraphVertex } from "../GraphVertex";
import {AbstractVertexType} from "../GraphVertex";

export class GraphEdge<VertexType extends AbstractVertexType> implements IGraphEdge<VertexType> {
    startVertex: IGraphVertex<VertexType>;
    endVertex: IGraphVertex<VertexType>;
    weight: number;

    /**
     * @param {GraphVertex} startVertex
     * @param {GraphVertex} endVertex
     * @param {number} [weight=1]
     */
    constructor(startVertex: IGraphVertex<VertexType>, endVertex: IGraphVertex<VertexType>, weight = 0) {
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this.weight = weight;
    }

    /**
     * @return {string}
     */
    getKey(): string {
        const startVertexKey = this.startVertex.getKey();
        const endVertexKey = this.endVertex.getKey();

        return `${startVertexKey}_${endVertexKey}`;
    }

    /**
     * @return {GraphEdge}
     */
    reverse(): GraphEdge<VertexType> {
        const tmp = this.startVertex;
        this.startVertex = this.endVertex;
        this.endVertex = tmp;

        return this;
    }

    /**
     * @return {string}
     */
    toString(): string {
        return this.getKey();
    }
}