import IGraphVertex from "../GraphVertex/IGraphVertex";

export default interface IGraphEdge {
    startVertex: IGraphVertex;
    endVertex: IGraphVertex;
    weight: number;

    getKey(): string;
    reverse(): IGraphEdge;
    toString(callback: Function): string;
}