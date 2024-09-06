import { Dataset } from "@semantizer/types";
import { TypeIndex } from "./types.js";
import { TYPE_INDEX } from "./voc.js";
import dataFactory from "@rdfjs/data-model";
import { DatasetCore as DatasetRdfjs, Quad } from "@rdfjs/types"; // TODO: PB if commented

const RDF = {
    TYPE: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
}


// DocumentWritableConstructor<TypeIndexRegistration, Thing> ThingWritable<TypeIndexStatement>
export function TypeIndexMixin<
    TBase extends new (...args: any[]) => Dataset
>(Base: TBase) {
    return class TypeIndexImpl extends Base implements TypeIndex {

        public getRegistrationForClass(forClass: string): Dataset {
            const datasetCore = this.match(
                undefined,
                dataFactory.namedNode(TYPE_INDEX.forClass),
                dataFactory.namedNode(forClass)
            );
            for (const q of datasetCore) {
                return new TypeIndexImpl(this.getThing(q.subject.value));
            }
            throw new Error("Registration not found");
        }
        
        public getInstanceForClass(forClass: string): Dataset {
            const registration = this.getRegistrationForClass(forClass);
            return registration.getObject(TYPE_INDEX.instance);
        }

    }
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