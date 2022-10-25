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

import Propertyable from "./Propertyable";
import Semanticable from "./Semanticable";

/**
 * The SemanticPropety class is the base implementation of the Propertyable 
 * interface.
 * 
 * It uses a function to get the value of the property. This way 
 * we can use a getter function to reflect the property value at the time it 
 * is processed.
 * 
 * For instance, a Person object with a getName method would have the following 
 * property value getter: "() => getName".
 */
export default class SemanticProperty implements Propertyable {

    /**
     * The name of the property.
     * @see The Propertyable:getName method.
     */
    private name: string;

    /**
     * The function to call when the value is requested. It is used by the getValue method.
     * @see The getValue method.
     */
    private valueGetter: () => string | number | boolean | Semanticable | Array<string | number | boolean | Semanticable> | IterableIterator<string | number | boolean | Semanticable> | undefined;

    /**
     * 
     * @param name The name of the property, like "http://xmlns.com/foaf/0.1/name" or "@id" 
     * for instance.
     * @param valueGetter A function used to retrieve the value of the property when requested. 
     * Could be a getter function for instance like "() => getName".
     */
    constructor(name: string, valueGetter: () => string | number | boolean | Semanticable | Array<string | number | boolean | Semanticable> | IterableIterator<string | number | boolean | Semanticable> | undefined) {
        this.name = name;
        this.valueGetter = valueGetter;
    }

    public getName(): string {
        return this.name;
    }

    public getValue(): string | number | boolean | Semanticable | Array<string | number | boolean | Semanticable> | IterableIterator<string | number | boolean | Semanticable> | undefined {
        return this.valueGetter();
    }

}