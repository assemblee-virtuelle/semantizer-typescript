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

import Semanticable from "./Semanticable";
import Propertyable from "./Propertyable";
import SemanticProperty from "./SemanticProperty.js";
import Serializer from "./Serializer";

/**
 * The SemanticObject class is the base implementation of the Semanticable 
 * interface. It allows an object to store semantic properties and to be 
 * serialized. To add a semantic property to that object, you can use the 
 * different registerSemantic<Type> methods.
 * 
 * @see The Semanticable interface.
 * @see The registerSemanticReference() method.
 * @see The registerSemanticCollection() method.
 * @see The registerSemanticConstant() method.
 * @see The registerSemanticValue() method.
 */
export default class SemanticObject implements Semanticable {

    public static readonly ATTRIBUTES = {
        ID: '@id',
        TYPE: '@type'
    };

    /**
     * This contains the list of Edges attached to this object. Edges are the 
     * way to store the semantic properties. An Edge 
     */
    private properties: Propertyable[];

    /**
     * Allows to retrieve an Edge by name faster (no need to search). To get the
     * index of the Edge you want to retrieve, simply use the "get" method of this 
     * Map like "nameIndex.get(nameOfTheEdge)". Then, access to the requested Edge 
     * object with "edges[index]".
     * 
     * @note The map key stores the name of the Edge while the value holds the index 
     * of the Edge in the "edges" array: Map<nameOfTheEdge, indexOfTheEdge>.
     */
    private nameIndex: Map<string, number>;

    constructor(semanticId: string | undefined = undefined, semanticType: string | undefined = undefined) {
        this.properties = new Array<SemanticProperty>();
        this.nameIndex = new Map<string, number>();
        if (semanticId) this.setSemanticId(semanticId);
        if (semanticType) this.setSemanticType(semanticType);
    }

    /**
     * Append a new Edge in the list of edges. It also updates the 
     * nameIndex for a faster access. It should be used only by the 
     * registerSemantic<Type> methods.
     * 
     * @param name The name of the Edge to create.
     * @param node The object the Edge to create must target.
     * @see The Edgeable interface.
     * @see The nameIndex property.
     */
    protected createProperty(name: string, valueGetter: () => string | number | boolean | Semanticable | string[] | number[] | boolean[] | IterableIterator<Semanticable>) {
        let elementCount: number = this.properties.push(new SemanticProperty(name, valueGetter));
        let index: number = elementCount - 1;
        this.nameIndex.set(name, index);
    }

    public getProperties(): IterableIterator<Propertyable> {
        return this.properties.values();
    }

    public getPropertyByName(name: string): Propertyable | undefined {
        let index: number | undefined = this.nameIndex.get(name);
        return index !== undefined ? this.properties[index] : undefined;
    }

    public getSemanticId(): string | undefined {
        return "" + this.getPropertyByName(SemanticObject.ATTRIBUTES.ID)?.getValue();
    }

    public getSemanticType(): string | undefined {
        return "" + this.getPropertyByName(SemanticObject.ATTRIBUTES.TYPE)?.getValue();
    }

    public registerSemanticProperty(name: string, valueGetter: () => string | number | boolean | Semanticable | string[] | number[] | boolean[] | IterableIterator<Semanticable>): void {
        this.createProperty(name, valueGetter);
    }

    public setSemanticId(id: string): void {
        this.registerSemanticProperty(SemanticObject.ATTRIBUTES.ID, () => id);
    }

    public setSemanticType(type: string): void {
        this.registerSemanticProperty(SemanticObject.ATTRIBUTES.TYPE, () => type);
    }

    public serialize(serializer: Serializer<any>): object {
        return serializer.process(this);
    }
    
}