import { ILinkedListNode } from "./ILinkedListNode";

export class LinkedListNode<NodeType> implements ILinkedListNode<NodeType> {
    value: NodeType;
    next: LinkedListNode<NodeType> | null;

    /**
     * @param {*} value
     * @param {*} next
     */
    constructor(value: NodeType, next: (LinkedListNode<NodeType> | null) = null) {
        this.value = value;
        this.next = next;
    }

    /**
     * @param {function} [callback]
     * @return {string}
     */
    toString(callback: (value: any) => string): string {
        return callback ? callback(this.value) : `${this.value}`;
    }
}