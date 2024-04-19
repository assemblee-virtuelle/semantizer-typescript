import { Comparable, Copyable, WithOwner } from "./Common";
import { Thing } from "./Thing";

export type StatementOf<T extends Thing<any, any>> = T extends Thing<infer TypeArg, any> ? TypeArg : never;

export interface StatementBase {
    getSubject(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}

export interface WithNotifications {
    registerCallbackForValueChanged(callbackfn: (value: string) => void): ThisType<this>;
    registerCallbackForDatatypeChanged(callbackfn: (datatype: string) => void): ThisType<this>;
    registerCallbackForLanguageChanged(callbackfn: (language: string) => void): ThisType<this>;
}

export interface WithWriteOperations {
    setValue(value: string): this;
    setDatatype(datatype: string): this;
    setLanguage(language: string): this;
}

export type Statement<
    ThingType extends Thing<any, any>,
    //ThingTypeWritable extends ThingWritable<any, any>
> = StatementBase &
    WithOwner<ThingType> & 
    Copyable & 
    //CopyableToWritable<StatementWritable<ThingTypeWritable, ThingType>> & 
    Comparable; //<Statement<ThingType>>; //, ThingTypeWritable>>;

// export type StatementWritable<
//     ThingType extends ThingWritable<any, any>, // Should be Thing?
//     ThingTypeReadonly extends Thing<any, any>
// > = StatementBase & 
//     WithOwner<ThingType> & 
//     WithWriteOperations & 
//     Copyable & 
//     CopyableToReadonly<Statement<ThingTypeReadonly, ThingType>> & 
//     CopyableToWritable<StatementWritable<ThingType, ThingTypeReadonly>> & 
//     Comparable<StatementWritable<ThingType, ThingTypeReadonly>>;