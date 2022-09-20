/*
Copyright (C) 2022 Maxime Lecoq <maxime@lecoqlibre.fr>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import Edgeable from "./Edgeable";
import Semanticable from "./Semanticable";
import Serializer from "./Serializer";

/**
 * This is an abstract base class used to reduce the codebase.
 * It provides some basic methods implementation of the 
 * Semanticable interface.
 */
export default abstract class Node implements Semanticable {

    public isReference(): boolean {
        return false;
    }

    public getEdges(): IterableIterator<Edgeable> {
        return [].values();
    }

    public getEdgeByName(name: string): Edgeable | undefined {
        throw new Error("This object does not hold any edge.");
    }

    public getReferencedObject(): Semanticable {
        return this;
    }

    public getSemanticId(): string | undefined {
        throw new Error("This object does not have a semantic id.");
    }

    public getSemanticType(): string | undefined {
        throw new Error("This object does not have a semantic type.");
    }

    public getValue(): string {
        throw new Error("This object does not have any value. Please use a Constant or an Value object instead.");
    }

    public registerSemanticCollection(name: string, collection: Semanticable[]): void {
        throw new Error("This object can not register a semantic property.");
    }

    public registerSemanticReference(name: string, object: Semanticable): void {
        throw new Error("This object can not register a semantic property.");
    }

    public registerSemanticValue(name: string, valueGetter: Function): void {
        throw new Error("This object can not register a semantic property.");
    }

    public registerSemanticConstant(name: string, value: string): void {
        throw new Error("This object can not register a semantic property.");
    }

    public setSemanticId(id: string): void {
        throw new Error("This object can not have a semantic id.");
    }

    public setSemanticType(type: string): void {
        throw new Error("This object can not have a semantic type.");
    }

    public serialize(serializer: Serializer<any>): object {
        return serializer.process(this);
    }


}