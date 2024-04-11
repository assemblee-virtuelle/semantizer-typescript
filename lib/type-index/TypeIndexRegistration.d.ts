import { Document, DocumentReadonly } from "../core/Document";
import Resource from "../core/Resource";
import { Statement, StatementReadonly } from "../core/Statement";
import { Thing, ThingReadonly } from "../core/Thing";
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
export interface TypeIndexRegistration<DocumentType extends Document<any, any, any, any>> extends Thing<Statement<TypeIndexRegistration<any>>, DocumentType>, TypeIndexRegistrationBase, WithWriteOperations {
}
export interface TypeIndexRegistrationReadonly<DocumentType extends DocumentReadonly<any, any, any, any>> extends ThingReadonly<StatementReadonly<TypeIndexRegistrationReadonly<any>>, DocumentType>, TypeIndexRegistrationBase {
}
export interface TypeIndexSelfDescribing<DocumentType extends Document<any, any, any, any>> extends Thing<Statement<TypeIndexSelfDescribing<any>>, DocumentType> {
}
export interface TypeIndexSelfDescribingReadonly<DocumentType extends DocumentReadonly<any, any, any, any>> extends ThingReadonly<StatementReadonly<TypeIndexSelfDescribingReadonly<any>>, DocumentType> {
}
//# sourceMappingURL=TypeIndexRegistration.d.ts.map