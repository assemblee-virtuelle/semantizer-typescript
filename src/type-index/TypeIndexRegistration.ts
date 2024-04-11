import { Document } from "../core/Document";
import Resource from "../core/Resource";
import { ThingOfDocument, ThingReadonly } from "../core/Thing";
//import { TypeIndexReadonly } from "./TypeIndex";

export interface TypeIndexRegistrationBase {
    isForClass(forClass: string): boolean;
    getForClass(): string | null;
    getForClassAll(): string[];
    getInstance(): string | null;
    getInstanceAll(): string[];
    getInstanceContainer(): string | null;
    getInstanceContainerAll(): string[];
}

export interface WithWriteOperations {
    addForClass(forClass: string | Resource): this;
    addInstance(instance: string | Resource): this;
    addInstanceContainer(instanceContainer: string | Resource): this;
    setForClass(forClass: string): this;
    removeForClass(forClass: string): this;
    removeInstance(instance: string): this;
    removeInstanceContainer(instanceContainer: string): this;
    removeForClassAll(): this;
    removeInstanceAll(): this;
    removeInstanceContainerAll(): this; 
}

export interface TypeIndexRegistration<
    DocumentType extends Document<any, any>
> extends ThingOfDocument<DocumentType>, 
    TypeIndexRegistrationBase, 
    WithWriteOperations {}

export interface TypeIndexSelfDescribing<
    DocumentType extends Document<any, any>
> extends ThingOfDocument<DocumentType> {}

/*export interface TypeIndexRegistrationReadonly
extends ThingReadonly<TypeIndexReadonly>, 
    TypeIndexRegistrationBase {}*/

/*
<
    ContainedStatement extends StatementReadonly<any> = StatementReadonly<TypeIndexReadonly>
>*/