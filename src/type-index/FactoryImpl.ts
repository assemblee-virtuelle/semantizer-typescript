import { DocumentImpl } from "../core-default/DocumentImpl.js";
import ThingImpl from "../core-default/ThingImpl";
import { Context } from "../core/Context";
import { Document, StatementOf } from "../core/Document";
import { Factory } from "../core/Factory";
import Resource from "../core/Resource";
import ThingWithHelpersMixin from "../thing-helpers/ThingWithHelpersMixin";
import { TypeIndex, TypeIndexDocument, TypeIndexRegistrationThing } from "./TypeIndex";
import { TypeIndexImpl } from "./TypeIndexImpl";
import { TypeIndexRegistration } from "./TypeIndexRegistration";

// type TypeIndexRegistrationThing = TypeIndexRegistration<TypeIndexDocument>;
// type TypeIndexDocument = TypeIndex<TypeIndexRegistrationThing, TypeIndexRegistrationThing>;
type Doc = Document<TypeIndexRegistrationThing, TypeIndexRegistrationThing>;

const ThingWithHelpers = ThingWithHelpersMixin(ThingImpl);

export class FactoryImpl implements Factory<TypeIndexDocument> {
    
    public createDocument(uri?: string | undefined, context?: Context | undefined): TypeIndexDocument {
        const doc: Doc = new DocumentImpl<TypeIndexRegistrationThing, TypeIndexRegistrationThing>(this);
        return new TypeIndexImpl(doc);
    }
    
    public createThingToDescribeDocument(document: TypeIndexDocument): TypeIndexRegistrationThing {
        throw new Error();
        // return new ThingWithHelpers(typeIndex, ThingType.ForDescribing)
        //     .addRdfTypeStatement("solid:TypeIndex")
        //     .addRdfTypeStatement("solid:ListedDocument");
    }
    
    public createThing(document: TypeIndexDocument, uri: string): TypeIndexRegistrationThing {
        throw new Error();
        // return new TypeIndexRegistrationImpl<Statement<TypeIndex>>(document, uri);// as TypeIndexRegistration<Statement<TypeIndex>>;
    }
    
    public createThingWithoutUri(document: TypeIndexDocument, nameHint?: string | undefined): TypeIndexRegistrationThing {
        throw new Error("Method not implemented.");
    }
    
    public createStatement(thing: TypeIndexRegistrationThing, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<TypeIndexDocument> {
        throw new Error("Method not implemented.");
    }

}

const factory = new FactoryImpl();
const typeIndex = factory.createDocument();
typeIndex.createRegistration("ex:class");