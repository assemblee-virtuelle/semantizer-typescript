import DocumentDefaultImpl from "./DocumentDefaultImpl";
import { TypeIndexRegistrationDefaultImpl } from "./TypeIndexRegistrationDefaultImpl";
export default class TypeIndexDefault extends DocumentDefaultImpl {
    createRegistration(nameHintOrUri) {
        const thing = super.createThing(nameHintOrUri);
        return new TypeIndexRegistrationDefaultImpl(thing);
    }
    addRegistration(regitration) {
        throw new Error("Method not implemented.");
    }
    deleteRegistration(registration) {
        throw new Error("Method not implemented.");
    }
    getRegistration(registration) {
        throw new Error("Method not implemented.");
    }
    getRegistrationsAll() {
        throw new Error("Method not implemented.");
    }
    getRegistrationsAllForClass(forClass) {
        throw new Error("Method not implemented.");
    }
    getRegistrationsAllForInstance(instance) {
        throw new Error("Method not implemented.");
    }
    getRegistrationsAllForInstanceContainer(instanceContainer) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=TypeIndexDefault.js.map