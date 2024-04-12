import { Document, DocumentReadonly } from "../core/Document";
import Resource from "../core/Resource";
import { Statement, StatementReadonly } from "../core/Statement";
import { Thing, ThingReadonly } from "../core/Thing";
import { TypeIndex, TypeIndexReadonly } from "./TypeIndex";

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

// Don't know if the template argument might be useful in some cases, 
// so I let it for now.
export interface TypeIndexRegistration<
    DocumentType extends Document<any, any> = TypeIndex
> extends Thing<Statement<TypeIndexRegistration<any>>, DocumentType>, 
    TypeIndexRegistrationBase, 
    WithWriteOperations {}

// Don't know if the template argument might be useful in some cases, 
// so I let it for now.
export interface TypeIndexRegistrationReadonly<
    DocumentType extends DocumentReadonly<any, any> = TypeIndexReadonly
> extends ThingReadonly<StatementReadonly<TypeIndexRegistrationReadonly<any>>, DocumentType>, 
    TypeIndexRegistrationBase {}