import { DocumentWritableConstructor } from "../core/Document";
import { Thing } from "../core/Thing";
import { TypeIndexRegistration, TypeIndexStatement, WithReadOperations, WithWriteOperations } from "./TypeIndex";
import { TYPE_INDEX } from "./Vocabulary.js";

export function TypeIndexMixin<TBase extends DocumentWritableConstructor<TypeIndexRegistration, Thing>>(Base: TBase) {
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
        createRegistration(): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        addForClass(registration: string | TypeIndexRegistration, forClass: string): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        addInstance(registration: string | TypeIndexRegistration, instance: string): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        addInstanceContainer(registration: string | TypeIndexRegistration, instanceContainer: string): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        setForClass(registration: string | TypeIndexRegistration, forClass: string): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        removeForClass(registration: string | TypeIndexRegistration, forClass: string): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        removeInstance(registration: string | TypeIndexRegistration, instance: string): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        removeInstanceContainer(registration: string | TypeIndexRegistration, instanceContainer: string): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        removeForClassAll(registration: string | TypeIndexRegistration): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        removeInstanceAll(registration: string | TypeIndexRegistration): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }
        removeInstanceContainerAll(registration: string | TypeIndexRegistration): TypeIndexRegistration {
            throw new Error("Method not implemented.");
        }

        public forEachOfClass(forClass: string, callbackfn: (value: TypeIndexRegistration, index?: number, array?: TypeIndexRegistration[]) => void, thisArg?: any): void {
            this.forEach((s, i, a) => s.isForClass(forClass)? callbackfn(s, i, a): null, thisArg);
        }

        public createRegistrationForInstance(forClass: string, instance: string, nameHintOrUri?: string): TypeIndexRegistration {
            // this.addThing(new TypeIndexRegistrationImpl(forClass, instance, instanceContainer));
            const thing = this.createThing(); // "#reg"
            this.createStatement(thing, "rdf:type", TYPE_INDEX.TypeRegistration);
            this.createStatement(thing, TYPE_INDEX.forClass, forClass);
            this.createStatement(thing, TYPE_INDEX.instance, instance);

            return thing;
        }

        public createRegistrationForInstanceContainer(forClass: string, instanceContainer: string, nameHintOrUri?: string): TypeIndexRegistration {
            const thing = this.createThing(); // "#reg2"
            this.createStatement(thing, "rdf:type", TYPE_INDEX.TypeRegistration);
            this.createStatement(thing, TYPE_INDEX.forClass, forClass);
            this.createStatement(thing, TYPE_INDEX.instanceContainer, instanceContainer);
            return thing;
        }
    }
}