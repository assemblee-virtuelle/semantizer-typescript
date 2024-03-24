import Document from "./Document";
import DocumentDefault from "./DocumentDefault";
import TypeIndex from "./TypeIndex";
export default class TypeIndexDefault extends DocumentDefault implements TypeIndex {
    addRegistration(forClass: string, instance: string): void;
    removeRegistration(): void;
    getRegistrations(forClass?: string): Document[];
}
//# sourceMappingURL=TypeIndexDefault.d.ts.map