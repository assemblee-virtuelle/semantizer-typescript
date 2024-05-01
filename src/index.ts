import { DocumentWithChangelogMixin } from './changelog/DocumentWithChangelogImpl.js';
import DocumentImpl, { DocumentImplDefault } from './core-default/DocumentImpl.js';
import StatementImpl from './core-default/StatementImpl.js';
import ThingImpl, { ThingImplDefault } from './core-default/ThingImpl.js';
import { ThingWithNonDestructiveOperations, Thing } from './core/Thing.js';
import { RdfjsJsonLdSerializer } from './document-serializer-rdfjs/RdfjsSerializer.js';
import { DocumentLocalMixin } from './synchronized/DocumentSynchronizedImpl.js';
import { TypeIndexWithNonDestructiveOperations, TypeIndexStatement, TypeIndex, TypeIndexDestructiveOperations } from './type-index/types.js';
import { TypeIndexFactory, TypeIndexMixin, TypeIndexRegistrationMixin } from './type-index/impl.js';
import { WithChangelog } from './changelog/Changelog.js';
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import rdf from 'rdf-ext';
import { Readable } from 'readable-stream';

export { default as Semantizer } from './Semantizer.js';

const document = new DocumentImplDefault;
// const statement = document.createStatement("https://example.org/about", "https://example.org/property", "value");
// const getted = document.getStatement("https://example.org/about", "https://example.org/property");

// const documentReadonly = document as Document;
// documentReadonly.getStatementAboutSelf("");

// document.forEach(s => console.log(s.getSubject(), s.getValue()));

// const typeIndexFactory = new TypeIndexFactory(DocumentImpl, ThingImpl<Statement<TypeIndexRegistration>, TypeIndex>, ThingImpl<Statement<TypeIndexSelfDescribingThing>, TypeIndex>, StatementImpl) ;//DocumentImpl<TypeIndex, TypeIndexReadonly>);

const TypeIndexImpl = TypeIndexMixin(DocumentImpl);
const TypeIndexRegistrationImpl = TypeIndexRegistrationMixin(ThingImpl<TypeIndexStatement>, StatementImpl); // Todo: couple together?
// const typeIndexDocument = new TypeIndexImpl(TypeIndexRegistrationImpl, ThingImplDefault); //(new DocumentImpl<TypeIndexStatement>);

const TypeIndexWithChangelog = TypeIndexMixin(DocumentWithChangelogMixin(DocumentImpl)); //DocumentWithChangelogMixin(TypeIndexMixin(DocumentImpl)); //DocumentWithChangelogMixin(TypeIndexImpl);
const typeIndexWithChangelog = new TypeIndexWithChangelog(TypeIndexRegistrationImpl, ThingImplDefault); //new TypeIndexImpl(new DocumentImpl<TypeIndexStatement>()));
typeIndexWithChangelog.createRegistrationForInstanceContainer("http://www.example.org/types#Catalog", "https://example.org/catalogs", "http://example.org/#reg1");
typeIndexWithChangelog.createRegistrationForInstanceContainer("http://example.org/types/CatalogItems", "https://example.org/catalogItems", "http://example.org/#reg2");

typeIndexWithChangelog.forEach(t => console.log(t));

const serializer = new RdfjsJsonLdSerializer();
serializer.serialize(typeIndexWithChangelog).then(json => console.log(json));

// const serializer = new SerializerJsonld({ compact: true });
// const input = new Readable({
//     objectMode: true,
//     read: () => {
//         input.push(
//             rdf.quad(
//                 rdf.namedNode("http://example.org/#reg1"),
//                 rdf.namedNode("http://example.org.prop"),
//                 rdf.namedNode("https://example.org/catalogs")
//             )
//         )

//         input.push(null);
//     }
// });

// const output = serializer.import(input);
//     output.on("data", (json) => console.log(json));

// const TypeIndexLocal = DocumentLocalMixin(DocumentWithChangelogMixin(TypeIndexMixin(DocumentImpl)));
// const typeIndexLocal = new TypeIndexLocal(TypeIndexRegistrationImpl, ThingImpl); //new DocumentImpl<TypeIndexStatement>);
// typeIndexLocal.saveUpdate();

