import { ThingDefaultImpl as ThingDefaultImplCore, ThingType } from "../core-default/ThingImpl";
import DocumentBase from "../core/Document";
import ThingState from "./ThingState";
import ThingBase from "../core-default/Thing";
import { RdfjsDatasetSerializable } from "./RdfjsDatasetSerializable";
import DatasetCore from "@rdfjs/dataset/DatasetCore";
export declare class ThingDefaultImpl extends ThingDefaultImplCore implements ThingBase, RdfjsDatasetSerializable {
    private _state;
    constructor(document: DocumentBase, stateType: ThingType, uriOrNameHint?: string);
    protected getState(): ThingState;
    equals(other: ThingBase): boolean;
    getUri(): string;
    toRdfjsDataset(): DatasetCore;
}
export default ThingDefaultImpl;
//# sourceMappingURL=ThingDefaultImpl.d.ts.map