import IGraphEdge from "../GraphEdge";

export default interface IGraphVertex {
    value: any;
    edges: IGraphVertex[];

    addEdge(edge: IGraphEdge): IGraphVertex;
    deleteEdge(edge: IGraphEdge): void;
    getNeighbors(): IGraphVertex[];
    getEdges(): IGraphEdge[];
    getDegree():number ;
    hasEdge(requiredEdge: IGraphEdge): boolean;
    hasNeighbor(vertex: IGraphVertex): boolean;
    findEdge(vertex: IGraphVertex): IGraphEdge & null;
    getKey(): string;
    deleteAllEdges(): IGraphVertex;
    toString(callback: Function): string;
}