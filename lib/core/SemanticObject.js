/*
Copyright (c) 2023 Maxime Lecoq <maxime@lecoqlibre.fr>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
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
export default class SemanticObject {
    constructor(dataset, other) {
        this._dataset = other ? other._dataset : dataset;
    }
    getDataset() {
        return this._dataset;
    }
    execute(sparql) {
        return this.handle(sparql);
    }
    addSemanticProperty(name, value) {
        return this.execute(`ADD;${name};${value}^^${typeof value}`);
    }
    getSemanticProperty(name) {
        return this.execute(`GET;${name}`); //`SELECT ?value WHERE { ?s ${name} ?value. LIMIT 1 }`);
    }
    getSemanticPropertyAll(name) {
        var _a;
        return (_a = this.execute(`GET_ALL;${name}`)) !== null && _a !== void 0 ? _a : []; //`SELECT ?values WHERE { ?s ${name} ?values }`) ?? [];
    }
    setSemanticProperty(name, newValue, oldValue) {
        return this.execute(`SET;${name};${newValue}^^${typeof newValue};${oldValue}^^${typeof oldValue}`);
    }
    removeSemanticProperty(name, value) {
        return this.execute(`REMOVE;${name};${value}`);
    }
}
//# sourceMappingURL=SemanticObject.js.map