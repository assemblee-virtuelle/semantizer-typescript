import { DocumentImpl, DocumentImplFactoryImpl, StatementImpl, ThingImpl } from "@semantizer/core-default";
import { LoaderRdfjs } from "@semantizer/loader-rdfjs";
import { DocumentConstructor, DocumentFactory, DocumentImplFactory, Thing } from "@semantizer/types";
import { WebIdProfile, WebIdProfileConstructor, WebIdProfileMixin } from "@semantizer/webid";
import { Enterprise, EnterpriseFactory } from "./Enterprise.js";

export type Person = WebIdProfile & PersonOperations;

export interface PersonOperations {
    getName(): string | undefined;
    getAffiliatedEnterprises(): Promise<Enterprise>[];
    getAffiliatedEnterprisesUri(): string[];
}

export function PersonMixin<
    TBase extends WebIdProfileConstructor
>(Base: TBase) {

    return class PersonMixinImpl extends Base implements PersonOperations {

        public constructor(...args: any[]) {
            super(...args);
        }

        public getName(): string | undefined {
            return this.getPrimaryTopic().getStatement("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#name")?.getValue();
        }

        public getAffiliatedEnterprises(): Promise<Enterprise>[] {
            const loader = new LoaderRdfjs();
            const factory = new EnterpriseFactory(DocumentImpl, new DocumentImplFactoryImpl(ThingImpl, ThingImpl, StatementImpl));
            return this.getPrimaryTopic().getStatementAll("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#affiliatedBy").map(s => factory.load(s.getValue(), loader));
        }

        public getAffiliatedEnterprisesUri(): string[] {
            return this.getPrimaryTopic().getStatementAll("https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#affiliatedBy").map(s => s.getValue());
        }

    }

}

export class PersonFactory implements DocumentFactory<Person> {

    private _DocumentImpl: DocumentConstructor<Thing, Thing>;
    private _documentImplFactory: DocumentImplFactory;

    constructor(DocumentImpl: DocumentConstructor<Thing, Thing>, documentImplFactory: DocumentImplFactory) { 
        this._DocumentImpl = DocumentImpl;
        this._documentImplFactory = documentImplFactory;
    }

    public create(): Person {
        const PersonImpl = PersonMixin(WebIdProfileMixin(this._DocumentImpl));
        return new PersonImpl(this._documentImplFactory);
    }

    public createFrom(): Person {
        throw new Error;
    }

}