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
 * serialized. To add a semantic property to that object, use the 
 * registerSemanticProperty methods.
 * 
 * @see The Semanticable interface.
 * @see The Propertyable interface.
 * @see The registerSemanticProperty() method.
 */
export default class SemanticObject implements Semanticable {

    public static readonly ATTRIBUTES = {
        ID: '@id',
        TYPE: '@type'
    };

    /**
     * This contains the list of properties attached to this object. 
     */
    private properties: Propertyable[];

    /**
     * Associates the name of a property to its corresponding index in the properties array. 
     * It allows to retrieve a property object by name faster (no need to search).
     * 
     * To get the index of the property you want to retrieve, simply use the "get" method 
     * of this Map like "nameIndex.get(nameOfTheProperty)". Then, access to the requested 
     * property object with "properties[index]".
     */
    private nameIndex: Map<string, number>;

    constructor(semanticId: string | undefined = undefined, semanticType: string | undefined = undefined) {
        this.properties = new Array<SemanticProperty>();
        this.nameIndex = new Map<string, number>();
        if (semanticId) this.setSemanticId(semanticId);
        if (semanticType) this.setSemanticType(semanticType);
    }

    /**
     * Append a new property in the list of properties. It also updates the nameIndex 
     * for a faster access. It should only be used publicly by the registerSemanticProperty 
     * method.
     * 
     * @param name The name of the property to create.
     * @param valueGetter The funtion to get the value of the property.
     * @see The nameIndex property.
     */
    protected createProperty(name: string, valueGetter: () => string | number | boolean | Semanticable | string[] | number[] | boolean[] | IterableIterator<Semanticable> | undefined) {
        let elementCount: number = this.properties.push(new SemanticProperty(name, valueGetter));
        let index: number = elementCount - 1;
        this.nameIndex.set(name, index);
    }

    public getSemanticProperties(): IterableIterator<Propertyable> {
        return this.properties.values();
    }

    public getSemanticPropertyValue(name: string): string | number | boolean | Semanticable | Array<string | number | boolean | Semanticable> | IterableIterator<string | number | boolean | Semanticable> | undefined {
        let index: number | undefined = this.nameIndex.get(name);
        return index !== undefined ? this.properties[index].getValue() : undefined;
    }

    public getSemanticId(): string | undefined {
        return "" + this.getSemanticPropertyValue(SemanticObject.ATTRIBUTES.ID);
    }

    public getSemanticType(): string | undefined {
        return "" + this.getSemanticPropertyValue(SemanticObject.ATTRIBUTES.TYPE);
    }

    public isBlankNode(): boolean {
        const semanticId = this.getSemanticId();
        return semanticId === undefined || semanticId === "" || semanticId === "undefined";
    }

    public registerSemanticProperty(name: string, valueGetter: () => string | number | boolean | Semanticable | string[] | number[] | boolean[] | IterableIterator<Semanticable> | undefined): void {
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