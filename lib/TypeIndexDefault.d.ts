import Resource from "./Resource";
import ResourceDefault from "./ResourceDefault";
import TypeIndex from "./TypeIndex";
export default class TypeIndexDefault extends ResourceDefault implements TypeIndex {
    addRegistration(forClass: string, instance: string): void;
    removeRegistration(): void;
    getRegistrations(forClass?: string): Resource[];
}
//# sourceMappingURL=TypeIndexDefault.d.ts.map