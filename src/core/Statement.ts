import { ThingBase, ThingReadonly } from "./Thing";

export type StatementOf<T extends ThingBase<any>> = T extends ThingBase<infer TypeArg> ? TypeArg : never;

export interface StatementBase {
    registerCallbackForValueChanged(callbackfn: (value: string) => void): ThisType<this>;
    registerCallbackForDatatypeChanged(callbackfn: (datatype: string) => void): ThisType<this>;
    registerCallbackForLanguageChanged(callbackfn: (language: string) => void): ThisType<this>;
    toCopy(): ThisType<this>;
}

export interface WithThing<
    ThingType extends ThingBase<any>
> {
    getThing(): ThingType;
}

export interface WithReadOperations {
    getSubject(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}

export interface WithWriteOperations {
    setValue(): this;
    setDatatype(): this;
    setLanguage(): this;
}

export interface WithCopyOperations<
    ThingType extends ThingBase<any> // Should be Thing?
> {
    toCopyReadonly(): StatementOf<ThingType>;
}

export interface WithCopyWritableOperations<
    ThingType extends ThingBase<any> // Should be Thing or ThingReadonly
> {
    toCopyWritable(): StatementOf<ThingType>;
}

export type Statement<
    ThingType extends ThingBase<any> // Should be Thing?
> = StatementBase & 
    WithThing<ThingType> & 
    WithReadOperations & 
    WithWriteOperations & 
    WithCopyOperations<ThingType> & 
    WithCopyWritableOperations<ThingType>;

export type StatementReadonly<
    ThingType extends ThingReadonly<StatementReadonly<ThingType>, any>
> = StatementBase &
    WithThing<ThingType> & 
    WithReadOperations & 
    WithCopyWritableOperations<ThingType>;