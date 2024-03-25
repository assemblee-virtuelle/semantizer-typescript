import Document from "./Document";
import DocumentDefaultImpl from "./DocumentDefaultImpl"
import TypeIndex from "./TypeIndex";

export default class TypeIndexDefault extends DocumentDefaultImpl implements TypeIndex {

    public addRegistration(forClass: string, instance: string): void {

    }

    public removeRegistration(): void {
        
    }

    public getRegistrations(forClass?: string): Document[] {
        return [];
    }

}