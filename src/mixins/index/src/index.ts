import { indexFactory } from "./IndexMixin.js";

// const namespaces = {
//     idx: "https://ns.inria.fr/idx/terms#",
//     sh: "https://www.w3.org/ns/shacl#"
// }

// const context = {
//     closed: namespaces.sh + 'closed',
//     hasShape: namespaces.idx + 'hasShape',
//     hasSubIndex: namespaces.idx + 'hasSubIndex'
// }

export {
    IndexMixin,
    indexFactory
} from "./IndexMixin.js";

export {
    IndexEntryMixin,
    indexEntryFactory
} from "./IndexEntryMixin.js";

export {
    IndexShapeMixin,
    indexShapeFactory
} from "./IndexShapeMixin.js";

export {
    IndexShapePropertyMixin,
    indexShapePropertyValueFactory,
    indexShapePropertyPatternFactory
} from "./IndexShapePropertyMixin.js";

export { 
    Index,
    IndexEntry,
    IndexShape,
    IndexShapeComparisonResult,
    IndexShapeProperty,
    IndexStrategy,
    IndexStrategyFinalIndexes,
    FinalIndexResult
} from "./types.js";

export { IndexStrategyBaseImpl } from "./IndexStrategyBaseImpl.js";

export { IndexStrategyFinalIndexesDefaultImpl } from "./IndexStrategyFinalIndexesDefaultImpl.js";

export default indexFactory;