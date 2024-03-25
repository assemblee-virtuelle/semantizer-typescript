import Document from "./Document";
import DocumentDefaultImpl from "./DocumentDefaultImpl";
import TypeIndex from "./TypeIndex";
export default class TypeIndexDefault extends DocumentDefaultImpl implements TypeIndex {
    addRegistration(forClass: string, instance: string): void;
    removeRegistration(): void;
    getRegistrations(forClass?: string): Document[];
}
//# sourceMappingURL=TypeIndexDefault.d.ts.map