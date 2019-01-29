import {GraphVertex} from "../GraphVertex";
import {GraphEdge} from "../GraphEdge";
import {IGraph} from "./IGraph";
import {AbstractVertexType} from "../GraphVertex/AbstractVertexType";

type VerticesIndices = {
    [key: string]: number;
}

export class Graph<VertexType extends AbstractVertexType> implements IGraph<VertexType> {
    vertices: Map<string, GraphVertex<VertexType>>;
    edges: Map<string, GraphEdge<VertexType>>;
    isDirected: boolean;

    /**
     * @param {boolean} isDirected
     */
    constructor(isDirected = false) {
        this.vertices = new Map<string, GraphVertex<VertexType>>();
        this.edges = new Map<string, GraphEdge<VertexType>>();
        this.isDirected = isDirected;
    }

    /**
     * @param {GraphVertex} newVertex
     * @returns {Graph}
     */
    addVertex(newVertex: GraphVertex<VertexType>): Graph<VertexType> {
        this.vertices.set(newVertex.getKey(), newVertex);

        return this;
    }

    /**
     * @param {string} vertexKey
     * @returns GraphVertex
     */
    getVertexByKey(vertexKey: string): (GraphVertex<VertexType> | undefined) {
        return this.vertices.get(vertexKey);
    }

    /**
     * @param {GraphVertex} vertex
     * @returns {GraphVertex[]}
     */
    getNeighbors(vertex: GraphVertex<VertexType>): GraphVertex<VertexType>[] {
        return vertex.getNeighbors();
    }

    /**
     * @return {GraphVertex[]}
     */
    getAllVertices(): GraphVertex<VertexType>[] {
        return Object.values(this.vertices);
    }

    /**
     * @return {GraphEdge[]}
     */
    getAllEdges(): GraphEdge<VertexType>[] {
        return Object.values(this.edges);
    }

    /**
     * @param {GraphEdge} edge
     * @returns {Graph}
     */
    addEdge(edge: GraphEdge<VertexType>): Graph<VertexType> {
        // Try to find and end start vertices.
        let startVertex = this.getVertexByKey(edge.startVertex.getKey());
        let endVertex = this.getVertexByKey(edge.endVertex.getKey());

        // Insert start vertex if it wasn't inserted.
        if (!startVertex) {
            this.addVertex(edge.startVertex);
            startVertex = this.getVertexByKey(edge.startVertex.getKey());
        }

        // Insert end vertex if it wasn't inserted.
        if (!endVertex) {
            this.addVertex(edge.endVertex);
            endVertex = this.getVertexByKey(edge.endVertex.getKey());
        }

        // Check if edge has been already added.
        if (this.edges.get(edge.getKey())) {
            throw new Error('Edge has already been added before');
        } else {
            this.edges.set(edge.getKey(),edge);
        }

        // Add edge to the vertices.
        if (this.isDirected) {
            // If graph IS directed then add the edge only to start vertex.
            if(startVertex !== undefined) {
                startVertex.addEdge(edge);
            }
        } else {
            // If graph ISN'T directed then add the edge to both vertices.
            if(startVertex !== undefined && endVertex !== undefined) {
                startVertex.addEdge(edge);
                endVertex.addEdge(edge);
            }
        }

        return this;
    }

    /**
     * @param {GraphEdge} edge
     */
    deleteEdge(edge: GraphEdge<VertexType>): void {
        // Delete edge from the list of edges.
        if (this.edges.get(edge.getKey())) {
            this.edges.delete(edge.getKey());
        } else {
            throw new Error('Edge not found in graph');
        }

        // Try to find and end start vertices and delete edge from them.
        const startVertex = this.getVertexByKey(edge.startVertex.getKey());
        const endVertex = this.getVertexByKey(edge.endVertex.getKey());

        if(startVertex !== undefined && endVertex !== undefined) {
            startVertex.deleteEdge(edge);
            endVertex.deleteEdge(edge);
        }
    }

    /**
     * @param {GraphVertex} startVertex
     * @param {GraphVertex} endVertex
     * @return {(GraphEdge|null)}
     */
    findEdge(startVertex: GraphVertex<VertexType>, endVertex: GraphVertex<VertexType>): (GraphEdge<VertexType> | null) {
        const vertex = this.getVertexByKey(startVertex.getKey());

        if (!vertex) {
            return null;
        }

        return vertex.findEdge(endVertex);
    }

    /**
     * @return {number}
     */
    getWeight(): number {
        return this.getAllEdges().reduce((weight, graphEdge) => {
            return weight + graphEdge.weight;
        }, 0);
    }

    /**
     * Reverse all the edges in directed graph.
     * @return {Graph}
     */
    reverse(): Graph<VertexType> {
        /** @param {GraphEdge} edge */
        this.getAllEdges().forEach((edge) => {
            // Delete straight edge from graph and from vertices.
            this.deleteEdge(edge);

            // Reverse the edge.
            edge.reverse();

            // Add reversed edge back to the graph and its vertices.
            this.addEdge(edge);
        });

        return this;
    }

    /**
     * @return {object}
     */
    getVerticesIndices(): VerticesIndices {
        const verticesIndices:VerticesIndices = {};
        this.getAllVertices().forEach((vertex, index) => {
            verticesIndices[vertex.getKey()] = index;
        });

        return verticesIndices;
    }

    /**
     * @return {*[][]}
     */
    getAdjacencyMatrix(): Array<Array<number>> {
        const vertices = this.getAllVertices();
        const verticesIndices = this.getVerticesIndices();

        // Init matrix with infinities meaning that there is no ways of
        // getting from one vertex to another yet.
        const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
            return Array(vertices.length).fill(Infinity);
        });

        // Fill the columns.
        vertices.forEach((vertex, vertexIndex) => {
            vertex.getNeighbors().forEach((neighbor) => {
                const neighborIndex = verticesIndices[neighbor.getKey()];
                const edge = this.findEdge(vertex, neighbor);
                if(edge) {
                    adjacencyMatrix[vertexIndex][neighborIndex] = edge.weight;
                }
            });
        });

        return adjacencyMatrix;
    }

    /**
     * @return {string}
     */
    toString(): string {
        return Object.keys(this.vertices).toString();
    }
}