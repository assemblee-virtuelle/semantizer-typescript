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
export { default as SemantizerDefault } from './SemantizerDefault.js';
export { default as ContextDefault } from './ContextDefault.js';
export { default as SemanticObject } from './SemanticObject.js';
export { default as SemanticObjectAnonymous } from './SemanticObjectAnonymous.js';
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
const address = semantizer.createDocument({ semanticId: "https://example.org/address", semanticType: "dfc-b:Address" });
const addressAnonymous = semantizer.createDocument({ semanticType: "dfc-b:Address" });
semantizer.exportDocument(address, addressAnonymous);
const exportedDocument = semantizer.createDocument({ semanticContainedResource: [address, addressAnonymous] });
//exportedDocument.addSemanticContainedResource(address, addressAnonymous);
semantizer.exportDocument(exportedDocument);
// exportedDocument.export();
const catalog = semantizer.createDocument({ semanticType: "dfc-b:Catalog" });
catalog.addStringStatementAbout("dfc-b:name", "Catalogue d'hiver", "fr");
const catalogItem = semantizer.createDocument();
catalog.addStatementFrom(catalogItem.filter((s) => s === ""), "#ci1");
// Si resource distante alors pas possible de modifier le semanticID
// SI resource locale, possible d'assigner un semantic ID
// PB: il faut savoir où stocker la resource avant de la créer.
// const container = new LdpContainer();
// const resource = container.createSemanticResource()
//# sourceMappingURL=index.js.map