import DatasetCore from "@rdfjs/dataset/DatasetCore";

export interface RdfjsDatasetSerializable {
    toRdfjsDataset(): DatasetCore;
}

export default RdfjsDatasetSerializable;