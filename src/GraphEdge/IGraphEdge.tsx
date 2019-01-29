import { IGraphVertex } from "../GraphVertex";
import { GraphEdge } from "./GraphEdge";
import { AbstractVertexType } from "../GraphVertex";

export interface IGraphEdge<VertexType extends AbstractVertexType> {
    startVertex: IGraphVertex<VertexType>;
    endVertex: IGraphVertex<VertexType>;
    weight: number;

    getKey(): string;
    reverse(): GraphEdge<VertexType>;
    toString(callback: (value: any) => string): string;
}