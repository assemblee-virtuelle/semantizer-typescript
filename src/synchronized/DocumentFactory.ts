import Context from "../core/Context";
import { WritableDocument } from "../core/Document";
import Thing from "../core/Thing";
import DocumentDefaultImpl from "../core-default/DocumentDefaultImpl";
import { DistantDocument } from "./DistantDocument";
import DistantDocumentDefaultImpl from "./DistantDocumentDefaultImpl";
import LocalDocument from "./LocalDocument";
import LocalDocumentDefaultImpl from "./LocalDocumentDefaultImpl";

export interface DocumentFactory<What> { //ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing> {
    createDocument(uri?: string, context?: Context): LocalDocument<What>; //ContainedThing, SelfDescribingThing>;
    loadDocument(uriOrData: string): DistantDocument<What>; //ContainedThing, SelfDescribingThing>;
}

// ContainedThing extends Thing = Thing, SelfDescribingThing extends Thing = Thing>
export class DocumentFactoryDefaultImpl<What> implements DocumentFactory<What> { //ContainedThing, SelfDescribingThing> {
    
    public createDocument(uri?: string | undefined, context?: Context | undefined): LocalDocument<ContainedThing, SelfDescribingThing> {
        return new LocalDocumentDefaultImpl(new DocumentDefaultImpl(uri, context));
    }

    public loadDocument(uriOrData: string): DistantDocument<ContainedThing, SelfDescribingThing> {
        return new DistantDocumentDefaultImpl(new DocumentDefaultImpl(uriOrData));
    }

    public create<Type>(c: { new (): Type }): Type {
        return new c();
    }

    public createT<Type>(c: { new (): Type }): Type {
        return new c();
    }

    public create2(c: { new (): What }): What {
        return new c();
    }

    public createObj<T>(template: new () => T) {
        return new template();
    }

    public createObj2(template: new () => What) {
        return new template();
    }

    public createLocalObj<T extends WritableDocument<any, any>>(template: new () => T) {
        return new LocalDocumentDefaultImpl(new template());
    }
    
}

// TODO: Essayer de loader un type index
// Utiliser un décorateur ? Permettrait d'être générique
// editable.save(); // côté browser <> côté serveur ? API connectivity pour OffLine?