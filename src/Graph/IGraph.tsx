import {GraphVertex, IGraphVertex} from "../GraphVertex";
import {GraphEdge, IGraphEdge} from "../GraphEdge";
import {AbstractVertexType} from "../GraphVertex/AbstractVertexType";

export interface IGraph<VertexType extends AbstractVertexType> {
    vertices: Map<string, GraphVertex<VertexType>>;
    edges: Map<string, GraphEdge<VertexType>>;
    isDirected: boolean;

    addVertex(newVertex: IGraphVertex<VertexType>): IGraph<VertexType>;
    getVertexByKey(vertexKey: (VertexType | string)): (GraphVertex<VertexType> | undefined);
    getNeighbors(vertex: IGraphVertex<VertexType>): IGraphVertex<VertexType>[];
    getAllVertices(): IGraphVertex<VertexType>[];
    getAllEdges(): IGraphEdge<VertexType>[];
    addEdge(edge: IGraphEdge<VertexType>): IGraph<VertexType>;
    deleteEdge(edge: IGraphEdge<VertexType>): void;
    findEdge(startVertex: IGraphVertex<VertexType>, endVertex: IGraphVertex<VertexType>): IGraphEdge<VertexType> | null;
    getWeight(): number;
    reverse(): IGraph<VertexType>;
    getVerticesIndices(): object;
    getAdjacencyMatrix(): Array<Array<number>>;
    toString(): string;
}