import ILinkedListNode from "./ILinkedListNode";

type FindParams = {
    value: any,
    callback: Function
}

export default interface ILinkedList {
    head: ILinkedListNode | null;
    tail: ILinkedListNode | null;
    compare: Function;

    prepend(value: any): ILinkedList;
    append(value: any): ILinkedList;
    delete(value: any): ILinkedListNode;
    find(value: FindParams): ILinkedListNode;
    deleteTail(): ILinkedListNode ;
    deleteHead(): ILinkedListNode;
    fromArray(values: Array<any>): ILinkedList;
    toArray(): ILinkedListNode[];
    toString(callback: Function): string;
    reverse(): ILinkedList;
}