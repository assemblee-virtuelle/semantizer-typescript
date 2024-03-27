import DocumentDefaultImpl from "./DocumentDefaultImpl";
import Resource from "./Resource";
import TypeIndex from "./TypeIndex";
import TypeIndexRegistration from "./TypeIndexRegistration";
export default class TypeIndexDefault extends DocumentDefaultImpl implements TypeIndex {
    createRegistration(nameHintOrUri?: string | undefined): TypeIndexRegistration;
    addRegistration(regitration: TypeIndexRegistration): void;
    deleteRegistration(registration: string | TypeIndexRegistration): void;
    getRegistration(registration: string | Resource): TypeIndexRegistration | null;
    getRegistrationsAll(): TypeIndexRegistration[];
    getRegistrationsAllForClass(forClass: string | Resource): TypeIndexRegistration[];
    getRegistrationsAllForInstance(instance: string | Resource): TypeIndexRegistration[];
    getRegistrationsAllForInstanceContainer(instanceContainer: string | Resource): TypeIndexRegistration[];
}
//# sourceMappingURL=TypeIndexDefault.d.ts.map