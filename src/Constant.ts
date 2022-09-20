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

/**
 * A Constant is a semantic property made to store 
 * a value that does not change over the time. That 
 * means that its value will not be automatically 
 * updated even if its original value has changed.
 * 
 * To automatically update a property value, use the Value 
 * property instead.
 * 
 * @see The Value class.
 */
export default class Constant extends Node {

    // @ts-ignore
    private value: string;

    constructor(value: string) {
        super();
        this.setValue(value);
    }

    /**
     * Getter for the value of this property.
     * @returns The value of this property.
     */
    public getValue(): string {
        return this.value;
    }

    /**
     * Setter for the value of this property.
     * @param value The value of this property to set.
     */
    public setValue(value: string): void {
        this.value = value
    }

}