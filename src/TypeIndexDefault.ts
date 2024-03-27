import Document from "./Document";
import DocumentDefaultImpl from "./DocumentDefaultImpl"
import Resource from "./Resource";
import TypeIndex from "./TypeIndex";
import TypeIndexRegistration from "./TypeIndexRegistration";
import { TypeIndexRegistrationDefaultImpl } from "./TypeIndexRegistrationDefaultImpl";

export default class TypeIndexDefault extends DocumentDefaultImpl implements TypeIndex {

    createRegistration(nameHintOrUri?: string | undefined): TypeIndexRegistration {
        const thing = super.createThing(nameHintOrUri);
        return new TypeIndexRegistrationDefaultImpl(thing);
    }

    addRegistration(regitration: TypeIndexRegistration): void {
        throw new Error("Method not implemented.");
    }

    deleteRegistration(registration: string | TypeIndexRegistration): void {
        throw new Error("Method not implemented.");
    }

    getRegistration(registration: string | Resource): TypeIndexRegistration | null {
        throw new Error("Method not implemented.");
    }

    getRegistrationsAll(): TypeIndexRegistration[] {
        throw new Error("Method not implemented.");
    }

    getRegistrationsAllForClass(forClass: string | Resource): TypeIndexRegistration[] {
        throw new Error("Method not implemented.");
    }

    getRegistrationsAllForInstance(instance: string | Resource): TypeIndexRegistration[] {
        throw new Error("Method not implemented.");
    }

    getRegistrationsAllForInstanceContainer(instanceContainer: string | Resource): TypeIndexRegistration[] {
        throw new Error("Method not implemented.");
    }

}