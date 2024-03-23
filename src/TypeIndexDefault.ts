import Document from "./Document";
import DocumentDefault from "./DocumentDefault"
import TypeIndex from "./TypeIndex";

export default class TypeIndexDefault extends DocumentDefault implements TypeIndex {

    public addRegistration(forClass: string, instance: string): void {

    }

    public removeRegistration(): void {
        
    }

    public getRegistrations(forClass?: string): Document[] {
        return [];
    }

}