import Document from "./Document";
import Resource from "./Resource";
import TypeIndexRegistration from "./TypeIndexRegistration";
export default interface TypeIndex extends Document {
    createRegistration(nameHintOrUri?: string): TypeIndexRegistration;
    addRegistration(regitration: TypeIndexRegistration): void;
    deleteRegistration(registration: string | TypeIndexRegistration): void;
    getRegistration(registration: string | Resource): TypeIndexRegistration | null;
    getRegistrationsAll(): TypeIndexRegistration[];
    getRegistrationsAllForClass(forClass: string | Resource): TypeIndexRegistration[];
    getRegistrationsAllForInstance(instance: string | Resource): TypeIndexRegistration[];
    getRegistrationsAllForInstanceContainer(instanceContainer: string | Resource): TypeIndexRegistration[];
}
//# sourceMappingURL=TypeIndex.d.ts.map