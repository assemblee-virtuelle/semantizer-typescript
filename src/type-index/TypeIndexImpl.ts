import DocumentDecoratedImpl from "../core/Decorated.js";
import { Statement } from "../core/Document";
import { TypeIndexStatement, WithReadOperations, WithWriteOperations } from "./TypeIndex";

export class TypeIndexImpl 
extends DocumentDecoratedImpl<TypeIndexStatement>  
implements WithReadOperations, WithWriteOperations {
    getStatementForClass(forClass: string): TypeIndexStatement[] {
        throw new Error("Method not implemented.");
    }
    getStatementForInstance(instance: string): TypeIndexStatement[] {
        throw new Error("Method not implemented.");
    }
    getStatementForInstanceContainer(instanceContainer: string): TypeIndexStatement[] {
        throw new Error("Method not implemented.");
    }
    addForClass(forClass: string): this {
        throw new Error("Method not implemented.");
    }
    addInstance(instance: string): this {
        throw new Error("Method not implemented.");
    }
    addInstanceContainer(instanceContainer: string): this {
        throw new Error("Method not implemented.");
    }
    setForClass(forClass: string): this {
        throw new Error("Method not implemented.");
    }
    removeForClass(forClass: string): this {
        throw new Error("Method not implemented.");
    }
    removeInstance(instance: string): this {
        throw new Error("Method not implemented.");
    }
    removeInstanceContainer(instanceContainer: string): this {
        throw new Error("Method not implemented.");
    }
    removeForClassAll(): this {
        throw new Error("Method not implemented.");
    }
    removeInstanceAll(): this {
        throw new Error("Method not implemented.");
    }
    removeInstanceContainerAll(): this {
        throw new Error("Method not implemented.");
    }
    
    public forEachOfClass(forClass: string, callbackfn: (value: Statement, index?: number, array?: Statement[]) => void, thisArg?: any): void {
        this.forEach((s, i, a) => s.isForClass(forClass)? callbackfn(s, i, a): null, thisArg);
    }

    public createRegistration(forClass?: string, nameHintOrUri?: string | undefined): this {
        const registration = this.createThingWithUri(nameHintOrUri);
        if (forClass)
            registration.addForClass(forClass);
        return registration;
    }

}

// export function TypeIndexMixin<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
//     return TypeIndexImpl;
// }

// export function TypeIndexMixinReadonly<TBase extends Constructor<DocumentBase<any, any>>>(Base: TBase) {
//     return TypeIndexImplReadOrWrite;
// }