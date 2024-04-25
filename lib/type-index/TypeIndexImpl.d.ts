import { DocumentWritableConstructor } from "../core/Document";
import { ThingWritable } from "../core/Thing";
import { TypeIndexStatement } from "./TypeIndex";
import { TypeIndexRegistration } from "./TypeIndexRegistration";
export declare function TypeIndexMixin<TBase extends DocumentWritableConstructor<TypeIndexRegistration, ThingWritable<TypeIndexStatement>>>(Base: TBase): {
    new (...args: any[]): {
        getStatementForClass(registration: string | TypeIndexRegistration, forClass: string): TypeIndexStatement | undefined;
        getStatementForInstance(registration: string | TypeIndexRegistration, instance: string): TypeIndexStatement | undefined;
        getStatementForInstanceContainer(registration: string | TypeIndexRegistration, instanceContainer: string): TypeIndexStatement | undefined;
        getStatementAllForClass(registration: string | TypeIndexRegistration, forClass: string): TypeIndexStatement[];
        getStatementAllForInstance(registration: string | TypeIndexRegistration, instance: string): TypeIndexStatement[];
        getStatementAllForInstanceContainer(registration: string | TypeIndexRegistration, instanceContainer: string): TypeIndexStatement[];
        createRegistration(): TypeIndexRegistration;
        addForClassToRegistration(registration: string | TypeIndexRegistration, forClass: string): TypeIndexRegistration;
        addInstanceToRegistration(registration: string | TypeIndexRegistration, instance: string): TypeIndexRegistration;
        addInstanceContainerToRegistration(registration: string | TypeIndexRegistration, instanceContainer: string): TypeIndexRegistration;
        setForClassOfRegistration(registration: string | TypeIndexRegistration, forClass: string, oldValue?: string): TypeIndexRegistration;
        setInstanceOfRegistration(registration: string | TypeIndexRegistration, instance: string, oldValue?: string): TypeIndexRegistration;
        setInstanceContainerOfRegistration(registration: string | TypeIndexRegistration, instanceContainer: string, oldValue?: string): TypeIndexRegistration;
        removeForClassOfRegistration(registration: string | TypeIndexRegistration, ...forClasses: string[]): TypeIndexRegistration;
        removeInstanceOfRegistration(registration: string | TypeIndexRegistration, ...instance: string[]): TypeIndexRegistration;
        removeInstanceContainerOfRegistration(registration: string | TypeIndexRegistration, ...instanceContainer: string[]): TypeIndexRegistration;
        removeForClassAllOfRegistration(registration: string | TypeIndexRegistration): TypeIndexRegistration;
        removeInstanceAllOfRegistration(registration: string | TypeIndexRegistration): TypeIndexRegistration;
        removeInstanceContainerAllOfRegistration(registration: string | TypeIndexRegistration): TypeIndexRegistration;
        forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index?: number, array?: TypeIndexRegistration[]) => void, thisArg?: any): void;
        createThing(uriOrNameHint?: string): TypeIndexRegistration;
        createRegistrationForInstance(forClass: string, instance: string, nameHintOrUri?: string): TypeIndexRegistration;
        createRegistrationForInstanceContainer(forClass: string, instanceContainer: string, nameHintOrUri?: string): TypeIndexRegistration;
        createThingAboutSelf(): ThingWritable<TypeIndexStatement>;
        addThing(other: import("../core/Thing").Thing<import("../core/Statement").Statement>): TypeIndexRegistration;
        addThingAll(others: Iterable<import("../core/Thing").Thing<import("../core/Statement").Statement>>): TypeIndexRegistration[];
        addThingAboutSelf(other: import("../core/Thing").Thing<import("../core/Statement").Statement>): ThingWritable<TypeIndexStatement>;
        addThingAboutSelfAll(others: Iterable<import("../core/Thing").Thing<import("../core/Statement").Statement>>): ThingWritable<TypeIndexStatement>[];
        createStatement(about: string | import("../core/Common").Resource, property: string, value: string, datatype?: string | undefined, language?: string | undefined): TypeIndexStatement;
        createStatementAboutSelf(property: string, value: string, datatype?: string | undefined, language?: string | undefined): TypeIndexStatement;
        addStatement(other: import("../core/Statement").Statement): TypeIndexStatement;
        addStatementAll(others: Iterable<import("../core/Statement").Statement>): TypeIndexStatement[];
        addStatementAboutSelf(other: import("../core/Statement").Statement): TypeIndexStatement;
        addStatementAboutSelfAll(others: Iterable<import("../core/Statement").Statement>): TypeIndexStatement[];
        setThing(thing: TypeIndexRegistration, uri?: string | undefined): TypeIndexRegistration;
        setThingAt(index: number, thing: TypeIndexRegistration): TypeIndexRegistration;
        setStatement(about: string | import("../core/Common").Resource, property: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): TypeIndexStatement;
        setStatementAboutSelf(property: string, value: string, oldValue?: string | undefined, datatype?: string | undefined, language?: string | undefined): TypeIndexStatement;
        removeThing(thingOrUri: string | import("../core/Common").Resource): boolean;
        removeStatement(statement: import("../core/Statement").Statement): boolean;
        pop(): TypeIndexRegistration | undefined;
        reverse(): void;
        shift(): TypeIndexRegistration | undefined;
        sort(compareFn?: ((a: TypeIndexRegistration, b: TypeIndexRegistration) => number) | undefined): ThisType<any>;
        splice(start: number, deleteCount?: number | undefined): TypeIndexRegistration[];
        splice(start: number, deleteCount: number, ...items: TypeIndexRegistration[]): TypeIndexRegistration[];
        getThing(about: string | import("../core/Common").Resource): TypeIndexRegistration;
        getThingAboutSelf(): ThingWritable<TypeIndexStatement>;
        hasThing(about: string | import("../core/Common").Resource): boolean;
        hasThingAboutSelf(): boolean;
        getStatement(about: string | import("../core/Common").Resource, property: string, language?: string | undefined): TypeIndexStatement;
        getStatementAll(about: string | import("../core/Common").Resource, property?: string | undefined, language?: string | undefined): TypeIndexStatement[];
        getStatementAboutSelf(property: string, language?: string | undefined): TypeIndexStatement | undefined;
        getStatementAboutSelfAll(property?: string | undefined, language?: string | undefined): TypeIndexStatement[];
        hasStatement(about: string | import("../core/Common").Resource, property?: string | undefined, language?: string | undefined): boolean;
        hasStatementAboutSelf(property?: string | undefined, language?: string | undefined): boolean;
        at(index: number): TypeIndexRegistration | undefined;
        contains(other: import("../core/Document").Document<any, import("../core/Thing").Thing<import("../core/Statement").Statement>>): boolean;
        count(): number;
        every(predicate: (value: TypeIndexRegistration, index?: number | undefined, array?: TypeIndexRegistration[] | undefined) => boolean, thisArg?: any): boolean;
        filter(predicate: (value: TypeIndexRegistration, index?: number | undefined, array?: TypeIndexRegistration[] | undefined) => boolean): TypeIndexRegistration[];
        filterContainedStatement(predicate: (value: TypeIndexStatement, index?: number | undefined, array?: TypeIndexStatement[] | undefined) => boolean): TypeIndexStatement[];
        find(predicate: (value: TypeIndexRegistration, index?: number | undefined, obj?: TypeIndexRegistration[] | undefined) => boolean, thisArg?: any): TypeIndexRegistration | undefined;
        findIndex(predicate: (value: TypeIndexRegistration, index?: number | undefined, obj?: TypeIndexRegistration[] | undefined) => unknown, thisArg?: any): number;
        forEach(callbackfn: (value: TypeIndexRegistration, index?: number | undefined, array?: TypeIndexRegistration[] | undefined) => void, thisArg?: any): void;
        forEachStatement(callbackfn: (value: TypeIndexStatement, index?: number | undefined, array?: TypeIndexStatement[] | undefined) => void, thisArg?: any): void;
        includes(searchElement: TypeIndexRegistration, fromIndex?: number | undefined): boolean;
        indexOf(searchElement: TypeIndexRegistration, fromIndex?: number | undefined): number;
        keys(): IterableIterator<number>;
        map(callbackfn: (value: TypeIndexRegistration, index?: number | undefined, array?: TypeIndexRegistration[] | undefined) => unknown, thisArg?: any): unknown[];
        reduce(callbackfn: (previousValue: TypeIndexRegistration, currentValue: TypeIndexRegistration, currentIndex: number, array: TypeIndexRegistration[]) => import("../core/Thing").Thing<import("../core/Statement").Statement>): TypeIndexRegistration;
        slice(start?: number | undefined, end?: number | undefined): ThisType<any>;
        some(predicate: (value: TypeIndexRegistration, index?: number | undefined, array?: TypeIndexRegistration[] | undefined) => unknown, thisArg?: any): boolean;
        [Symbol.iterator](): Iterator<TypeIndexRegistration, any, undefined>;
        getUri(): string;
        hasUri(): boolean;
        getContext(): import("../core/Common").Context | undefined;
        equals(other: ThisType<any>): boolean;
        difference(other: ThisType<any>): ThisType<any>;
        toCopy(): ThisType<any>;
        deleteContext(): void;
        setContext(context: import("../core/Common").Context): void;
    };
} & TBase;
//# sourceMappingURL=TypeIndexImpl.d.ts.map