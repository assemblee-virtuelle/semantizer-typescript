import Semanticable from "./Semanticable";
import Constant from "./Constant.js";
import Collection from "./Collection.js";
import Value from "./Value.js";
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

import Reference from "./Reference.js";
import Node from "./Node.js";
import Edge from "./Edge.js";
import Edgeable from "./Edgeable";

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
export default class SemanticObject extends Node {

    public static readonly ATTRIBUTES = {
        ID: '@id',
        TYPE: '@type'
    };

    /**
     * This contains the list of Edges attached to this object. Edges are the 
     * way to store the semantic properties. An Edge 
     */
    private edges: Edge[];

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
        super();
        this.edges = new Array<Edge>();
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
    protected createEdge(name: string, node: Semanticable) {
        let elementCount: number = this.edges.push(new Edge(name, node));
        let index: number = elementCount - 1;
        this.nameIndex.set(name, index);
    }

    public getEdges(): IterableIterator<Edgeable> {
        return this.edges.values();
    }

    public getEdgeByName(name: string): Edgeable | undefined {
        let index: number | undefined = this.nameIndex.get(name);
        return index !== undefined ? this.edges[index] : undefined;
    }

    public getSemanticId(): string | undefined {
        return this.getEdgeByName(SemanticObject.ATTRIBUTES.ID)?.getTarget().getValue();
    }

    public getSemanticType(): string | undefined {
        return this.getEdgeByName(SemanticObject.ATTRIBUTES.TYPE)?.getTarget().getValue();
    }

    public registerSemanticReference(name: string, object: Semanticable): void {
        this.createEdge(name, new Reference(object));
    }

    public registerSemanticCollection(name: string, collection: Array<Semanticable>): void {
        this.createEdge(name, new Collection(collection));
    }

    public registerSemanticValue(name: string, valueGetter: Function): void {
        this.createEdge(name, new Value(valueGetter));
    }

    public registerSemanticConstant(name: string, value: string): void {
        this.createEdge(name, new Constant(value));
    }

    public setSemanticId(id: string): void {
        this.registerSemanticConstant(SemanticObject.ATTRIBUTES.ID, id);
    }

    public setSemanticType(type: string): void {
        this.registerSemanticConstant(SemanticObject.ATTRIBUTES.TYPE, type);
    }
    
}