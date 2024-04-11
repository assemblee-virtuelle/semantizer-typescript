import { Document } from "../core/Document";
import Resource from "../core/Resource";
import { ThingOfDocument } from "../core/Thing";
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
export interface TypeIndexRegistration<DocumentType extends Document<any, any>> extends ThingOfDocument<DocumentType>, TypeIndexRegistrationBase, WithWriteOperations {
}
export interface TypeIndexSelfDescribing<DocumentType extends Document<any, any>> extends ThingOfDocument<DocumentType> {
}
//# sourceMappingURL=TypeIndexRegistration.d.ts.map