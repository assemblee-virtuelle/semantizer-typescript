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

import SemantizerDefault from './SemantizerDefault.js';

export { default as Semantizer } from './Semantizer.js';
export { default as Context } from './Context.js';
export { default as SemantizerDefault } from './SemantizerDefault.js';
export { default as ContextDefault } from './ContextDefault.js';

const semantizer = new SemantizerDefault();

// Tests:
// - Import de données
// - Export de données
// - Ajout d'un blank node
// - Création de document
// - Création d'un object

// Import de données
semantizer.importDocument("path/to/measures.jsonld"); // import thesaurus
const importedAddress = semantizer.importDocument("https://example.org/address");
const importedJson = semantizer.importDocument("json data");

// 2 possibilités d'export:
const address = semantizer.createDocument("https://example.org/address")
    .createThingToSelfDescribe()
    .addRdfTypeStatement("dfc-b:Address");

const addressAnonymous = semantizer.createDocument()
    .createThingWithoutUri()
    .addRdfTypeStatement("dfc-b:Address");

semantizer.exportDocument(address.getDocument(), addressAnonymous.getDocument());

//const exportedDocument = semantizer.createDocument({ things: [address, addressAnonymous] });
//exportedDocument.addSemanticContainedResource(address, addressAnonymous);
//semantizer.exportDocument(exportedDocument);
// exportedDocument.export();

const catalog = semantizer.createDocument();

catalog.createThingToSelfDescribe(); // self describing
catalog.createThing(); // add thing with a generated name into the document
catalog.createThing("me"); // add a named thing into the document
catalog.createThing("http://example.org/thing"); // add a fixed thing into the document
catalog.createThingWithoutUri(); // add a generated name blank node into the document
catalog.createThingWithoutUri("blankNodeNameHint"); // add a named blank node into the document

catalog.createThingToSelfDescribe().addRdfTypeStatement("dfc-b:Catalog").addStringStatement("dfc-b:name", "test");

catalog.createThing().addRdfTypeStatement("dfc-b:CatalogItem").addStringStatement("dfc-b:name", "catalog item 1");

// Ajout d'une thing dans un document:
const catalogItem = semantizer.createDocument()
    .createThingToSelfDescribe()
    .addRdfTypeStatement("dfc-b:CatalogItem")
    .addStringStatement("dfc-b:name", "Catalog item 1");
catalog.addThing(catalogItem);

// Ajout d'un document dans un document:
const catalogItemDocument = semantizer.createDocument();
catalog.addDocument(catalogItemDocument);

// Si resource distante alors pas possible de modifier le semanticID
// SI resource locale, possible d'assigner un semantic ID

// PB: il faut savoir où stocker la resource avant de la créer.
// const container = new LdpContainer();
// const resource = container.createSemanticResource()