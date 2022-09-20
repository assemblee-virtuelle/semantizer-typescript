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

import Edgeable from './Edgeable';
import Semanticable from './Semanticable';

/**
 * This is the base implementation of the Edgeable interface.
 * 
 * @see The Edgeable interface.
 */
export default class Edge implements Edgeable {

    private name: string;
    private target: Semanticable;

    constructor(name: string, target: Semanticable) {
        this.name = name;
        this.target = target;
    }

    public getName(): string {
        return this.name;
    }

    public getTarget(): Semanticable {
        return this.target;
    }

}