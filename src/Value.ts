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
 * A Value is a semantic property made to store a value that 
 * does change over the time. That means that its value will 
 * be automatically updated when its original value has changed.
 * 
 * This is possible thanks to a function called when the value is 
 * requested.
 */
export default class Value extends Node {

    /**
     * The function to call when the value is requested.
     */
    private valueGetter: Function;

    constructor(valueGetter: Function) {
        super();
        this.valueGetter = valueGetter;
    }

    public getValue(): string {
        return this.valueGetter();
    }

}