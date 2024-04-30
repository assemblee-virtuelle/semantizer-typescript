import { Statement, StatementConstructor } from "../core/Statement";
export declare function TypeIndexRegistrationStatementMixin<TBase extends StatementConstructor<Statement>>(Base: TBase): {
    new (...args: any[]): {
        isForClass(forClass: string): boolean;
        isForInstance(instance: string): boolean;
        isForInstanceContainer(instanceContainer: string): boolean;
        getUri(): string;
        hasUri(): boolean;
        toCopy(): ThisType<any>;
        getSubject(): string;
        getProperty(): string;
        getValue(): string;
        getDatatype(): string | undefined;
        getLanguage(): string | undefined;
        setSubject(subject: string | import("../core/Common").Resource): ThisType<any>;
        setProperty(property: string): ThisType<any>;
        setValue(value: string): ThisType<any>;
        setDatatype(datatype: string): ThisType<any>;
        setLanguage(language: string): ThisType<any>;
    };
} & TBase;
//# sourceMappingURL=TypeIndexRegistrationStatement.d.ts.map