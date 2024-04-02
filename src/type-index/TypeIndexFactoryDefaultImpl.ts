import { DocumentWithReadAndWriteOperations } from "../contracts/Document";
import { TypeIndexWithReadAndWriteOperations, TypeIndexWithReadOperations } from "./TypeIndex";
import TypeIndexDefault from "./TypeIndexDefault";

export class TypeIndexFactoryDefaultImpl {

    public create(document?: DocumentWithReadAndWriteOperations): TypeIndexWithReadAndWriteOperations {
        return new TypeIndexDefault(document);
    }

    public load(document?: DocumentWithReadAndWriteOperations): TypeIndexWithReadOperations {
        return new TypeIndexDefault(document);
    }
}

export default TypeIndexFactoryDefaultImpl;