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
 * A Collection is a semantic property made to store 
 * several other objects like an array.
 */
export default class Collection extends Node {

    /**
     * The array of objects contained by this Collection.
     */
    private children: Array<Semanticable>;

    constructor(children: Array<Semanticable> = []) {
        super();
        this.children = children;
    }

    /**
     * Simply add the child to the Collection.
     * @param child 
     */
    public append(child: Semanticable) {
        this.children.push(child);
    }

    /**
     * Allows to iterate over the objects contained by this Collection.
     * @returns An iterator to iterate over the objects contained by 
     * this Collection.
     */
    public getChildren(): IterableIterator<Semanticable> {
        return this.children.values();
    }

}