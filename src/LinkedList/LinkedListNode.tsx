import ILinkedListNode from "./ILinkedListNode";

export default class LinkedListNode implements ILinkedListNode {
    value: any;
    next: any;

    /**
     * @param {*} value
     * @param {*} next
     */
    constructor(value: any, next = null) {
        this.value = value;
        this.next = next;
    }

    /**
     * @param {function} [callback]
     * @return {string}
     */
    toString(callback: Function) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}