export default interface IComparator {
    compare: (a: any, b:any) => boolean;

    defaultCompareFunction(a: string|number, b:string|number): boolean;

    equal: (a: any, b:any) => boolean;
    lessThan: (a: any, b:any) => boolean;
    greaterThan: (a: any, b:any) => boolean;
    lessThanOrEqual: (a: any, b:any) => boolean;
    greaterThanOrEqual: (a: any, b:any) => boolean;
    reverse(): void;
}