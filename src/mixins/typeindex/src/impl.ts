import { DatasetSemantizer, Semantizer, DatasetSemantizerMixinConstructor, NamedNode, BlankNode, GraphSemantizer } from "@semantizer/types";
import { TypeIndex } from "./types.js";
import { TYPE_INDEX } from "./voc.js";
import { DatasetCore as DatasetRdfjs, Quad } from "@rdfjs/types"; // TODO: PB if commented

const RDF = {
    TYPE: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
}


// DocumentWritableConstructor<TypeIndexRegistration, Thing> ThingWritable<TypeIndexStatement>
export function TypeIndexMixin<
    TBase extends DatasetSemantizerMixinConstructor
>(Base: TBase) {
    return class TypeIndexImpl extends Base implements TypeIndex {

        public getRegistrationForClass(forClass: string): DatasetSemantizer | undefined {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const datasetCore = this.match(
                undefined,
                dataFactory.namedNode(TYPE_INDEX.forClass),
                dataFactory.namedNode(forClass)
            );
            for (const q of datasetCore) {
                const registration = this.getSubGraph(q.subject as NamedNode | BlankNode);
                if (registration) {
                    return this.getSemantizer().build(registration);
                }
            }
            return undefined;
        }
        
        public getRegisteredInstanceForClass(forClass: string): DatasetSemantizer | undefined {
            const dataFactory = this.getSemantizer().getConfiguration().getRdfDataModelFactory();
            const registration = this.getRegistrationForClass(forClass);
            return registration?.getLinkedObject(dataFactory.namedNode(TYPE_INDEX.instance));
        }

    }
}

export function typeIndexFactory(semantizer: Semantizer) {
    // const _DatasetImpl = semantizer.getDatasetImpl();
    return semantizer.getMixinFactory(TypeIndexMixin); //, _DatasetImpl);
}

// export function TypeIndexRegistrationMixin<
//     TBase extends new (...args: any[]) => Dataset
// >(Base: TBase) {
//     return class TypeIndexRegistrationImpl extends Base implements TypeIndexRegistration {

//     }

// }

// export function TypeIndexRegistrationStatementMixin<
//     TBase extends new (...args: any[]) => Dataset
// >(Base: TBase) {
 
//     return class TypeIndexRegistrationStatementImpl extends Base implements TypeIndexStatement {

//     }

// }