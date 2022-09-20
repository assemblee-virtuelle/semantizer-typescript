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

import Node from "./Node.js";
import Semanticable from "./Semanticable";

/**
 * This semantic property acts like a proxy: it points 
 * to an other semantic object (called the "target").
 * 
 * This is made to store a property which is an object. For 
 * instance, a Person object could have a property to store 
 * an Address instance.
 */
export default class Reference extends Node {

    /**
     * The object this Reference points to.
     */
    private target: Semanticable;

    constructor(target: Semanticable) {
        super();

        if (target.isReference())
            throw new Error("A Reference must not reference another Reference. This avoid infinite recursion.");

        // This prevents to reference a Collection, Constant or a Value. 
        // We must reference only regular SemanticObject.
        try {
            target.getSemanticId();
        }
        catch(error) {
            throw new Error("A Reference must reference a SemanticObject that is identifiable.");
        }

        this.target = target;
    }

    public getValue(): string {
        return this.target.getValue();
    }

    public getReferencedObject(): Semanticable {
        return this.target;
    }

    public getSemanticId(): string | undefined {
        return this.target.getSemanticId();
    }

    public getSemanticType(): string | undefined {
        return this.target.getSemanticType();
    }

    public isReference(): boolean {
        return true;
    }

}