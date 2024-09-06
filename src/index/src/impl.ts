import { Dataset, Loader } from "@semantizer/types";
import { Index, Property } from "./types";
import { DatasetCore } from "@rdfjs/types";

const namespaces = {
    idx: "https://ns.inria.fr/idx/terms#",
    sh: "https://www.w3.org/ns/shacl#"
}

const context = {
    closed: namespaces.sh + 'closed',
    hasShape: namespaces.idx + 'hasShape',
    hasSubIndex: namespaces.idx + 'hasSubIndex'
}

export function IndexMixin<
    TBase extends new(...args: any[]) => Dataset
>(Base: TBase) {

    return class IndexImpl extends Base implements Index {

        // public constructor(...args: any[]) {
        //     super(...args);
        // }
        
        public async getTargets(loader: Loader, property: Property, ...properties: Property[]): Promise<Dataset[]> {
            throw new Error("Method not implemented.");
        }

        // public getEntries(path?: string | undefined, value?: string | undefined, pattern?: string | undefined): IndexEntry[] {
        //     this.filter(entry => {
        //         if (path && entry.getShape()?.getPropertiesAll()[0].get)
        //     })
        //     throw new Error("Method not implemented.");
        // }
    }
    
}

// export function IndexEntryMixin<
//     TBase extends ThingConstructorMixin<Thing>
// >(Base: TBase) {

//     return class IndexEntryImpl extends Base implements IndexEntry {

//         public constructor(...args: any[]) {
//             super(...args);
//         }

//         public getShape(): IndexEntryShape | undefined {
//             throw new Error("Method not implemented.");
//         }

//         public hasShape(): boolean {
//             return this.getStatement(context.hasShape) !== undefined;
//         }

//         public hasProperties(): boolean {
//             throw new Error("Method not implemented.");
//         }

//         public hasProperty(path?: string | undefined, value?: string | undefined, pattern?: string | undefined): boolean {
//             throw new Error("Method not implemented.");
//         }

//         public getSubIndex(): Index | undefined {
//             throw new Error("Method not implemented.");
//         }

//         public getSubIndexUri(): string | undefined {
//             return this.getStatement(context.hasSubIndex)?.getValue();
//         }
//     }
    
// }

// export function IndexEntryShapeMixin<
//     TBase extends ThingConstructorMixin<Thing>
// >(Base: TBase) {

//     return class IndexEntryShapeImpl extends Base implements IndexEntryShape {

//         public constructor(...args: any[]) {
//             super(...args);
//         }

//         public isClosed(): boolean {
//             const statement = this.getStatement(context.closed);
//             return statement? statement.getValue() === 'true': false;
//         }

//         public getPropertiesAll(): IndexEntryShapeProperty[] {
//             throw new Error("Method not implemented.");
//         }

//     }

// }

// export function IndexEntryShapePropertyMixin<
//     TBase extends ThingConstructorMixin<Thing>
// >(Base: TBase) {

//     return class IndexEntryShapePropertyImpl extends Base implements IndexEntryShapeProperty {

//         public constructor(...args: any[]) {
//             super(...args);
//         }

//         public getPath(): string | undefined {
//             throw new Error("Method not implemented.");
//         }

//         public getValue(): string | undefined {
//             throw new Error("Method not implemented.");
//         }

//         public getPattern(): string | undefined {
//             throw new Error("Method not implemented.");
//         }

//     }

// }