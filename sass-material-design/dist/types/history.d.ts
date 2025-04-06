/**
 * @file
 */
export declare class History<T> {
    #private;
    constructor(value?: T);
    clear(): void;
    is(value: T): boolean;
    set(value: T | undefined): void;
    was(value: T): boolean;
    wasLast(value: T): boolean;
}
//# sourceMappingURL=history.d.ts.map