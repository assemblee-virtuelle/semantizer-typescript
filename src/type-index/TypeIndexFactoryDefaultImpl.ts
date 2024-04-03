import { Document } from "../core/Document";
import { TypeIndex, ReadonlyTypeIndex } from "./TypeIndex";
import TypeIndexDefaultImpl from "./TypeIndexDefaultImpl";

export class TypeIndexFactoryDefaultImpl {

    public create(document?: Document): TypeIndex {
        return new TypeIndexDefaultImpl(document);
    }

    public load(document?: Document): ReadonlyTypeIndex {
        return new TypeIndexDefaultImpl(document);
    }
}

export default TypeIndexFactoryDefaultImpl;