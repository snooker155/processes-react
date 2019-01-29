export interface ILinkedListNode<NodeType> {
    value: NodeType;
    next: ILinkedListNode<NodeType> | null;

    toString(callback: (value: any) => string): string;
}