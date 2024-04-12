import { ThingBase, ThingReadonly } from "./Thing";

type StatementOf<T extends ThingBase<any>> = T extends ThingBase<infer TypeArg> ? TypeArg : never;

export interface StatementBase {
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
    ThingType extends ThingBase<any> // SHould be Thing?
> {
    toCopyReadonly(): StatementOf<ThingType>;
}

export interface WithCopyWritableOperations<
    ThingType extends ThingBase<any> // SHould be Thing or ThingReadonly
> {
    toCopyWritable(): StatementOf<ThingType>;
}

export type Statement<
    ThingType extends ThingBase<any> // SHould be Thing?
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