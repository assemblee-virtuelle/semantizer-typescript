import { DocumentWritableConstructor, Statement } from "../core/Document";
import { TypeIndexStatement, WithReadOperations, WithWriteOperations } from "./TypeIndex";
import { TYPE_INDEX } from "./Vocabulary.js";

export function TypeIndexMixin<TBase extends DocumentWritableConstructor<any, any>>(Base: TBase) {
    return class TypeIndexImpl extends Base implements WithReadOperations, WithWriteOperations {

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

        public createRegistrationForInstance(forClass: string, instance: string, nameHintOrUri?: string): ThisType<this> {
            // const thing = this.createThing();
            // this.createStatement(thing, "rdf:type", TYPE_INDEX.TypeRegistration);

            // this.addThing(new TypeIndexRegistrationImpl(forClass, instance, instanceContainer));
            
            this.createStatement("#reg", "rdf:type", TYPE_INDEX.TypeRegistration);
            this.createStatement("#reg", TYPE_INDEX.forClass, forClass);
            this.createStatement("#reg", TYPE_INDEX.instance, instance);
            return this;
        }

        public createRegistrationForInstanceContainer(forClass: string, instanceContainer: string, nameHintOrUri?: string): ThisType<this> {
            this.createStatement("#reg2", "rdf:type", TYPE_INDEX.TypeRegistration);
            this.createStatement("#reg2", TYPE_INDEX.forClass, forClass);
            this.createStatement("#reg2", TYPE_INDEX.instanceContainer, instanceContainer);
            return this;
        }
    }
}