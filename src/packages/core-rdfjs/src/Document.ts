import { Dataset, Document, DocumentConstructor } from "@semantizer/types";

export function DocumentMixin<
    TBase extends DocumentConstructor
>(Base: TBase) {

    return class DocumentMixinImpl extends Base implements Document {
        getDataset(): Dataset {
            throw new Error("Method not implemented.");
        }
    }

}

export default DocumentMixin;