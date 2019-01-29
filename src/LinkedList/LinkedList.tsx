import { LinkedListNode } from "./LinkedListNode";
import { Comparator } from "../Comparator";
import { ILinkedList, FindParams } from "./ILinkedList";
import { ILinkedListNode } from "./ILinkedListNode";

export class LinkedList<NodeType> implements ILinkedList<NodeType> {
    head: LinkedListNode<NodeType> | null;
    tail: LinkedListNode<NodeType> | null;
    compare: Comparator<NodeType>;

    /**
     * @param {Function} [comparatorFunction]
     */
    constructor(comparatorFunction: (a: NodeType, b: NodeType) => number) {
        /** @var LinkedListNode */
        this.head = null;

        /** @var LinkedListNode */
        this.tail = null;

        this.compare = new Comparator<NodeType>(comparatorFunction);
    }

    /**
     * @param {*} value
     * @return {LinkedList}
     */
    prepend(value: NodeType): LinkedList<NodeType> {
        // Make new node to be a head.
        const newNode = new LinkedListNode<NodeType>(value, this.head);
        this.head = newNode;

        // If there is no tail yet let's make new node a tail.
        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    /**
     * @param {*} value
     * @return {LinkedList}
     */
    append(value: NodeType): LinkedList<NodeType> {
        const newNode = new LinkedListNode(value);

        // If there is no head yet let's make new node a head.
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        // Attach new node to the end of linked list.
        if(this.tail) {
            this.tail.next = newNode;
        }

        this.tail = newNode;

        return this;
    }

    /**
     * @param {*} value
     * @return {LinkedListNode}
     */
    delete(value: NodeType): LinkedListNode<NodeType> | null {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;

        // If the head must be deleted then make next node that is differ
        // from the head to be a new head.
        while (this.head && this.compare.equal(this.head.value, value)) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            // If next node must be deleted then make next node to be a next next one.
            while (currentNode.next) {
                if (this.compare.equal(currentNode.next.value, value)) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        // Check if tail must be deleted.
        if (this.tail && this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode;
        }

        return deletedNode;
    }

    /**
     * @param {Object} findParams
     * @param {*} findParams.value
     * @param {function} [findParams.callback]
     * @return {LinkedListNode}
     */
    find({ value = undefined, callback = undefined }: FindParams): (LinkedListNode<NodeType> | null) {
        if (!this.head) {
            return null;
        }

        let currentNode: (LinkedListNode<NodeType> | null) = this.head;

        while (currentNode) {
            // If callback is specified then try to find node by callback.
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }

            // If value is specified then try to compare by value..
            if (value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    /**
     * @return {LinkedListNode}
     */
    deleteTail(): (LinkedListNode<NodeType> | null) {
        const deletedTail = this.tail;

        if (this.head === this.tail) {
            // There is only one node in linked list.
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        // If there are many nodes in linked list...

        // Rewind to the last node and delete "next" link for the node before the last one.
        let currentNode = this.head;
        if(currentNode) {
            while (currentNode.next) {
                if (!currentNode.next.next) {
                    currentNode.next = null;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        this.tail = currentNode;

        return deletedTail;
    }

    /**
     * @return {LinkedListNode}
     */
    deleteHead(): (LinkedListNode<NodeType> | null) {
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    /**
     * @param {*[]} values - Array of values that need to be converted to linked list.
     * @return {LinkedList}
     */
    fromArray(values: Array<NodeType>): LinkedList<NodeType> {
        values.forEach(value => this.append(value));

        return this;
    }

    /**
     * @return {LinkedListNode[]}
     */
    toArray(): ILinkedListNode<NodeType>[] {
        const nodes = [];

        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    /**
     * @param {function} [callback]
     * @return {string}
     */
    toString(callback: (value: any) => string): string {
        return this.toArray().map(node => node.toString(callback)).toString();
    }

    /**
     * Reverse a linked list.
     * @returns {LinkedList}
     */
    reverse(): LinkedList<NodeType> {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currNode) {
            // Store next node.
            nextNode = currNode.next;

            // Change next node of the current node so it would link to previous node.
            currNode.next = prevNode;

            // Move prevNode and currNode nodes one step forward.
            prevNode = currNode;
            currNode = nextNode;
        }

        // Reset head and tail.
        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}