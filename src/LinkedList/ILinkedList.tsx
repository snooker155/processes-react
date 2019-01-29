import { Comparator } from "../Comparator";
import { LinkedList } from "./LinkedList";
import { LinkedListNode } from "./LinkedListNode";
import { ILinkedListNode } from "./ILinkedListNode";

export type FindParams = {
    value?: any,
    callback: ((value: any) => boolean) | undefined
}

export interface ILinkedList<NodeType> {
    head: ILinkedListNode<NodeType> | null;
    tail: ILinkedListNode<NodeType> | null;
    compare: Comparator<NodeType>;

    prepend(value: NodeType): LinkedList<NodeType>;
    append(value: NodeType): LinkedList<NodeType>;
    delete(value: NodeType): (LinkedListNode<NodeType> | null);
    find(value: FindParams): (LinkedListNode<NodeType> | null);
    deleteTail(): (LinkedListNode<NodeType> | null) ;
    deleteHead(): (LinkedListNode<NodeType> | null);
    fromArray(values: Array<NodeType>): LinkedList<NodeType>;
    toArray(): LinkedListNode<NodeType>[];
    toString(callback: (value: any) => string): string;
    reverse(): LinkedList<NodeType>;
}