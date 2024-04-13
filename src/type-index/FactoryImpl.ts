import { DocumentImpl } from "../core-default/DocumentImpl.js";
import StatementImpl from "../core-default/StatementImpl.js";
import ThingImpl from "../core-default/ThingImpl.js";
import { Context } from "../core/Context";
import { ContainedThingOf, SelfDescribingThingOf, StatementOf } from "../core/Document";
import { Factory } from "../core/Factory";
import Resource from "../core/Resource";
import { Statement } from "../core/Statement.js";
import ThingWithHelpersMixin from "../thing-helpers/ThingWithHelpersMixin.js";
import { TypeIndex, TypeIndexReadonly } from "./TypeIndex";
import { TypeIndexImpl } from "./TypeIndexImpl.js";
import { TypeIndexRegistration } from "./TypeIndexRegistration.js";
import TypeIndexRegistrationImpl from "./TypeIndexRegistrationImpl.js";

const ThingWithHelpers = ThingWithHelpersMixin(ThingImpl);

export class FactoryImpl implements Factory<TypeIndex> {

    public createDocument(uri?: string | undefined, context?: Context | undefined): TypeIndex {
        const doc = new DocumentImpl<TypeIndex, TypeIndexReadonly>(this as Factory<TypeIndex>);
        return new TypeIndexImpl(doc);
    }
    
    public createThingToDescribeDocument(document: TypeIndex): SelfDescribingThingOf<TypeIndex> {
        return new ThingImpl<Statement<SelfDescribingThingOf<TypeIndex>>, TypeIndex>(document)
            .createStatement("rdf:type", "solid:TypeIndex")
            .createStatement("rdf:type", "solid:ListedDocument");
        // return new ThingWithHelpers(typeIndex, ThingType.ForDescribing)
        //     .addRdfTypeStatement("solid:TypeIndex")
        //     .addRdfTypeStatement("solid:ListedDocument");
    }
    
    public createThing(document: TypeIndex, uri: string): ContainedThingOf<TypeIndex> {
        type T = StatementOf<TypeIndex>;
        return new TypeIndexRegistrationImpl(document, uri);
    }
    
    public createThingWithoutUri(document: TypeIndex, nameHint?: string | undefined): TypeIndexRegistration {
        throw new Error("Method not implemented.");
    }
    
    // Maybe add a mathod to create statement for self describing thing
    public createStatement(thing: TypeIndexRegistration, about: string, value: string | Resource, datatype?: string | Resource, language?: string): StatementOf<TypeIndex> {
        return new StatementImpl(thing, about, value, datatype, language);
    }

}