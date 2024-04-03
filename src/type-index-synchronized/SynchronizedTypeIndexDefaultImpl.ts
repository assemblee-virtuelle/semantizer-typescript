import DocumentBase, { ReadonlyDocument, Document } from "../core/Document";
import Resource from "../core/Resource";
import Thing from "../core/Thing";
import DocumentDefaultImpl from "../core-default/DocumentDefaultImpl";
import { Context } from "../index";
import { DistantDocument, LocalDocument } from "../synchronized/SynchronizedDocument";
import { TypeIndex } from "../type-index/TypeIndex";
import TypeIndexDefaultImpl from "../type-index/TypeIndexDefaultImpl";
import TypeIndexRegistration from "../type-index/TypeIndexRegistration";
import { DistantTypeIndex } from "./SynchronizedTypeIndex";

// TODO: use mixin to extends multiple classes and don't need this class (it could be defined with a Type = Mixin1(Class))
export class SynchronizedTypeIndexDefaultImpl extends TypeIndexDefaultImpl implements TypeIndex, LocalDocument, DistantDocument<TypeIndex> {
    
    toLocalCopy(): LocalDocument & TypeIndex {
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

// type SynchronizedTypeIndexDefault = SynchronizedMixin(TypeIndex(Document))

const synchronizedTypeIndex = new SynchronizedTypeIndexDefaultImpl(new TypeIndexDefaultImpl(new DocumentDefaultImpl()));
synchronizedTypeIndex.deleteContext();
const readWrite: TypeIndex = synchronizedTypeIndex;
const local = synchronizedTypeIndex.toLocalCopy();
const distant: DistantTypeIndex = synchronizedTypeIndex;
local.deleteContext();
local.save();
distant.toLocalCopy();