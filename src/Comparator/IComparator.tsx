export default interface IComparator<CompareObjectType> {
    compare: (a: CompareObjectType, b: CompareObjectType) => number;

    equal(a: CompareObjectType, b: CompareObjectType): boolean;
    lessThan(a: CompareObjectType, b: CompareObjectType): boolean;
    greaterThan(a: CompareObjectType, b: CompareObjectType): boolean;
    lessThanOrEqual(a: CompareObjectType, b: CompareObjectType): boolean;
    greaterThanOrEqual(a: CompareObjectType, b: CompareObjectType): boolean;
    reverse(): void;
}