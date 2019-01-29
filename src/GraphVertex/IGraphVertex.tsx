import { GraphEdge } from "../GraphEdge";
import { GraphVertex } from "./GraphVertex";
import { ILinkedList } from "../LinkedList";
import {AbstractVertexType} from "./AbstractVertexType";

export interface IGraphVertex<VertexType extends AbstractVertexType> {
    value: VertexType;
    edges: ILinkedList<GraphEdge<VertexType>>;

    addEdge(edge: GraphEdge<VertexType>): GraphVertex<VertexType>;
    deleteEdge(edge: GraphEdge<VertexType>): void;
    getNeighbors(): GraphVertex<VertexType>[];
    getEdges(): GraphEdge<VertexType>[];
    getDegree(): number ;
    hasEdge(requiredEdge: GraphEdge<VertexType>): boolean;
    hasNeighbor(vertex: GraphVertex<VertexType>): boolean;
    findEdge(vertex: GraphVertex<VertexType>): GraphEdge<VertexType> | null;
    getKey(): string;
    deleteAllEdges(): GraphVertex<VertexType>;
    toString(callback: (value: any) => string): string;
}