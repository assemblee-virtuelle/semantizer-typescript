import { DocumentImpl } from "../core-default/DocumentImpl.js";
import StatementImpl from "../core-default/StatementImpl.js";
import ThingImpl from "../core-default/ThingImpl.js";
import { Context } from "../core/Context";
import { ContainedThingOf, Document, SelfDescribingThingOf, StatementOf } from "../core/Document";
import { Factory } from "../core/Factory";
import Resource from "../core/Resource";
import { Statement } from "../core/Statement.js";
import ThingWithHelpersMixin from "../thing-helpers/ThingWithHelpersMixin.js";
import { TypeIndexDocument, TypeIndexRegistrationThing, TypeIndexRegistrationThingReadonly, TypeIndexSelfDescribingThing, TypeIndexSelfDescribingThingReadonly } from "./TypeIndex";
import { TypeIndexImpl } from "./TypeIndexImpl.js";
import TypeIndexRegistrationImpl from "./TypeIndexRegistrationImpl.js";

type Doc = Document<TypeIndexRegistrationThing, TypeIndexSelfDescribingThing, TypeIndexRegistrationThingReadonly, TypeIndexSelfDescribingThingReadonly>;

const ThingWithHelpers = ThingWithHelpersMixin(ThingImpl);

export class FactoryImpl implements Factory<TypeIndexDocument> {

    public createDocument(uri?: string | undefined, context?: Context | undefined): TypeIndexDocument {
        const doc: Doc = new DocumentImpl<TypeIndexRegistrationThing, TypeIndexSelfDescribingThing, TypeIndexRegistrationThingReadonly, TypeIndexSelfDescribingThingReadonly>(this as Factory<TypeIndexDocument>);
        return new TypeIndexImpl(doc);
    }
    
    public createThingToDescribeDocument(document: TypeIndexDocument): SelfDescribingThingOf<TypeIndexDocument> {
        return new ThingImpl<Statement<SelfDescribingThingOf<TypeIndexDocument>>, TypeIndexDocument>(document)
            .createStatement("rdf:type", "solid:TypeIndex")
            .createStatement("rdf:type", "solid:ListedDocument");
        // return new ThingWithHelpers(typeIndex, ThingType.ForDescribing)
        //     .addRdfTypeStatement("solid:TypeIndex")
        //     .addRdfTypeStatement("solid:ListedDocument");
    }
    
    public createThing(document: TypeIndexDocument, uri: string): ContainedThingOf<TypeIndexDocument> {
        type T = StatementOf<TypeIndexDocument>;
        return new TypeIndexRegistrationImpl(document, uri);
    }
    
    public createThingWithoutUri(document: TypeIndexDocument, nameHint?: string | undefined): TypeIndexRegistrationThing {
        throw new Error("Method not implemented.");
    }
    
    // Maybe add a mathod to create statement for self describing thing
    public createStatement(thing: TypeIndexRegistrationThing, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<TypeIndexDocument> {
        return new StatementImpl(thing, about, value, datatype, language);
    }

}