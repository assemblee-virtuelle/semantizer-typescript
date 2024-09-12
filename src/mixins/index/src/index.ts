import { indexFactory } from "./impl.js";

export {
    IndexMixin,
    indexFactory,
    indexEntryFactory,
    IndexShapeMixin,
    indexShapeFactory,
    indexShapePropertyFactory,
    IndexShapePropertyMixin
} from "./impl.js";

export { 
    Index,
    IndexEntry,
    IndexShape,
    IndexShapeProperty
} from "./types.js";

export default indexFactory;