import { ThingConstructor, ThingWritable } from "../core/Thing";
export declare function TypeIndexRegistrationMixin<TBase extends ThingConstructor<ThingWritable>>(Base: TBase): {
    new (...args: any[]): {
        isForClass(forClass: string): boolean;
        getFirstElementOrNull(collection: string[]): string | null;
        addForClass(forClass: string): this;
        addInstance(instance: string): this;
        addInstanceContainer(instanceContainer: string): this;
        getForClass(): string | null;
        getForClassAll(): string[];
        getInstance(): string | null;
        getInstanceAll(): string[];
        getInstanceContainer(): string | null;
        getInstanceContainerAll(): string[];
        setForClass(forClass: string): this;
        removeForClass(forClass: string): this;
        removeInstance(instance: string): this;
        removeInstanceContainer(instanceContainer: string): this;
        removeForClassAll(): this;
        removeInstanceAll(): this;
        removeInstanceContainerAll(): this;
        getStatement(property: string, language?: string | undefined): import("../core/Statement").Statement | undefined;
        getStatementAll(property?: string | undefined, language?: string | undefined): import("../core/Statement").Statement[];
        hasStatement(property?: string | undefined, language?: string | undefined): boolean;
        at(index: number): import("../core/Statement").Statement | undefined;
        contains(other: import("../core/Thing").Thing): boolean;
        count(): number;
        every(predicate: (value: import("../core/Statement").Statement, index?: number | undefined, array?: import("../core/Statement").Statement[] | undefined) => boolean, thisArg?: any): boolean;
        filter(predicate: (value: import("../core/Statement").Statement, index?: number | undefined, array?: import("../core/Statement").Statement[] | undefined) => boolean): import("../core/Statement").Statement[];
        find(predicate: (value: import("../core/Statement").Statement, index?: number | undefined, obj?: import("../core/Statement").Statement[] | undefined) => boolean, thisArg?: any): import("../core/Statement").Statement | undefined;
        findIndex(predicate: (value: import("../core/Statement").Statement, index?: number | undefined, obj?: import("../core/Statement").Statement[] | undefined) => unknown, thisArg?: any): number;
        forEach(callbackfn: (value: import("../core/Statement").Statement, index?: number | undefined, array?: import("../core/Statement").Statement[] | undefined) => void, thisArg?: any): void;
        includes(searchElement: import("../core/Statement").Statement, fromIndex?: number | undefined): boolean;
        indexOf(searchElement: import("../core/Statement").Statement, fromIndex?: number | undefined): number;
        keys(): IterableIterator<number>;
        map(callbackfn: (value: import("../core/Statement").Statement, index?: number | undefined, array?: import("../core/Statement").Statement[] | undefined) => unknown, thisArg?: any): unknown[];
        reduce(callbackfn: (previousValue: import("../core/Statement").Statement, currentValue: import("../core/Statement").Statement, currentIndex: number, array: import("../core/Statement").Statement[]) => import("../core/Statement").Statement): import("../core/Statement").Statement;
        slice(start?: number | undefined, end?: number | undefined): import("../core/Thing").Thing;
        some(predicate: (value: import("../core/Statement").Statement, index?: number | undefined, array?: import("../core/Statement").Statement[] | undefined) => unknown, thisArg?: any): boolean;
        [Symbol.iterator](): Iterator<import("../core/Statement").Statement, any, undefined>;
        getUri(): string;
        hasUri(): boolean;
        getContext(): import("../core/Common").Context | undefined;
        equals(other: ThisType<any>): boolean;
        difference(other: ThisType<any>): ThisType<any>;
        toCopy(): ThisType<any>;
        createStatement(property: string, value: string, datatype?: string | undefined, language?: string | undefined): import("../core/Statement").Statement;
        addStatement(other: import("../core/Statement").Statement): import("../core/Statement").Statement;
        addStatementAll(others: Iterable<import("../core/Statement").Statement>): import("../core/Statement").Statement[];
        setStatement(property: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): import("../core/Statement").Statement | undefined;
        deleteStatement(statement: import("../core/Statement").Statement): boolean;
        pop(): import("../core/Statement").Statement | undefined;
        reverse(): void;
        shift(): import("../core/Statement").Statement | undefined;
        sort(compareFn?: ((a: import("../core/Statement").Statement, b: import("../core/Statement").Statement) => number) | undefined): ThisType<any>;
        splice(start: number, deleteCount?: number | undefined, ...items: import("../core/Statement").Statement[]): ThisType<any>;
    };
} & TBase;
export default TypeIndexRegistrationMixin;
//# sourceMappingURL=TypeIndexRegistrationImpl.d.ts.map