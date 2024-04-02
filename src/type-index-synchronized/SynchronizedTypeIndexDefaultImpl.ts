import Document, { DocumentWithReadOperations, DocumentWithReadAndWriteOperations } from "../contracts/Document";
import Resource from "../contracts/Resource";
import Thing from "../contracts/Thing";
import DocumentDefaultImpl from "../default/DocumentDefaultImpl";
import { Context } from "../index";
import { DistantDocument, LocalDocument } from "../synchronized/SynchronizedDocument";
import { TypeIndexWithReadAndWriteOperations } from "../type-index/TypeIndex";
import TypeIndexDefault from "../type-index/TypeIndexDefault";
import TypeIndexRegistration from "../type-index/TypeIndexRegistration";
import { DistantTypeIndex } from "./SynchronizedTypeIndex";

export class SynchronizedTypeIndexDefaultImpl extends TypeIndexDefault implements TypeIndexWithReadAndWriteOperations, LocalDocument, DistantDocument<TypeIndexWithReadAndWriteOperations> {
    
    toLocalCopy(): LocalDocument & TypeIndexWithReadAndWriteOperations {
        throw new Error("Method not implemented.");
    }

    save(): void {
        throw new Error("Method not implemented.");
    }
    isLocal(): boolean {
        throw new Error("Method not implemented.");
    }
    isDistant(): boolean {
        throw new Error("Method not implemented.");
    }
    getDistantUri(): string | undefined {
        throw new Error("Method not implemented.");
    }
    getDistantUriAll(): string[] {
        throw new Error("Method not implemented.");
    }

}

export default SynchronizedTypeIndexDefaultImpl;

const synchronizedTypeIndex = new SynchronizedTypeIndexDefaultImpl(new TypeIndexDefault(new DocumentDefaultImpl()));
//synchronizedTypeIndex
const readWrite: TypeIndexWithReadAndWriteOperations = synchronizedTypeIndex;
const local = synchronizedTypeIndex.toLocalCopy();
const distant: DistantTypeIndex = synchronizedTypeIndex;
//distant. 