import IGraphVertex from "../GraphVertex/IGraphVertex";
import IGraphEdge from "../GraphEdge/IGraphEdge";

export default interface IGraph {
    vertices: IGraphVertex[];
    edges: IGraphEdge[];
    isDirected: boolean;

    addVertex(newVertex: IGraphVertex): IGraph;
    getVertexByKey(vertexKey: string): IGraphVertex;
    getNeighbors(vertex: IGraphVertex): IGraphVertex[];
    getAllVertices(): IGraphVertex[];
    getAllEdges(): IGraphEdge[];
    addEdge(edge: IGraphEdge): IGraph;
    deleteEdge(edge: IGraphEdge): void;
    findEdge(startVertex: IGraphVertex, endVertex: IGraphVertex): IGraphEdge & null;
    getWeight(): number;
    reverse(): IGraph;
    getVerticesIndices(): object;
    getAdjacencyMatrix(): any[][];
    toString(): string;
}