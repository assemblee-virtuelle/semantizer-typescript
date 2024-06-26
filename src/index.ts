import { DocumentWithChangelogMixin } from './changelog/DocumentWithChangelogImpl.js';
import DocumentImpl, { DocumentImplDefault } from './core-default/src/DocumentImpl.js';
import StatementImpl from './core-default/src/StatementImpl.js';
import ThingImpl, { ThingImplDefault } from './core-default/src/ThingImpl.js';
import { RdfjsJsonLdSerializer } from './document-serializer-rdfjs/RdfjsSerializer.js';
import { DocumentLocalMixin } from './synchronized/DocumentSynchronizedImpl.js';
import { TypeIndexWithNonDestructiveOperations, TypeIndexStatement, TypeIndex, TypeIndexDestructiveOperations } from './typeindex/src/types.js';
import { TypeIndexFactory, TypeIndexMixin, TypeIndexRegistrationMixin } from './typeindex/src/impl.js';
import { WithChangelog } from './changelog/Changelog.js';
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import rdf from 'rdf-ext';
import { Readable } from 'readable-stream';
import SemantizerRdfjs from './core-rdfjs/src/SemantizerRdfjs.js';
import LoaderRdfjs from './loader-rdfjs/src/LoaderRdfjs.js';
import { WebIdProfile } from './webid/lib/types.js';
import { WebIdProfileFactory } from './webid/src/impl.js';

// const document = new DocumentImplDefault;
// const statement = document.createStatement("https://example.org/about", "https://example.org/property", "value");
// const getted = document.getStatement("https://example.org/about", "https://example.org/property");

// const documentReadonly = document as Document;
// documentReadonly.getStatementAboutSelf("");

// document.forEach(s => console.log(s.getSubject(), s.getValue()));

// const typeIndexFactory = new TypeIndexFactory(DocumentImpl, ThingImpl<Statement<TypeIndexRegistration>, TypeIndex>, ThingImpl<Statement<TypeIndexSelfDescribingThing>, TypeIndex>, StatementImpl) ;//DocumentImpl<TypeIndex, TypeIndexReadonly>);

// const TypeIndexImpl = TypeIndexMixin(DocumentImpl);
// const TypeIndexRegistrationImpl = TypeIndexRegistrationMixin(ThingImpl<TypeIndexStatement>, StatementImpl); // Todo: couple together?
// const typeIndexDocument = new TypeIndexImpl(TypeIndexRegistrationImpl, ThingImplDefault); //(new DocumentImpl<TypeIndexStatement>);

// const TypeIndexWithChangelog = TypeIndexMixin(DocumentWithChangelogMixin(DocumentImpl)); //DocumentWithChangelogMixin(TypeIndexMixin(DocumentImpl)); //DocumentWithChangelogMixin(TypeIndexImpl);
// const typeIndexWithChangelog = new TypeIndexWithChangelog(TypeIndexRegistrationImpl, ThingImplDefault); //new TypeIndexImpl(new DocumentImpl<TypeIndexStatement>()));
// typeIndexWithChangelog.createRegistrationForInstanceContainer("http://www.example.org/types#Catalog", "https://example.org/catalogs", "#reg1");
// typeIndexWithChangelog.createRegistrationForInstanceContainer("http://example.org/types/CatalogItems", "https://example.org/catalogItems", "#reg2");
// typeIndexWithChangelog.createRegistrationForInstanceContainer("http://www.example.org/types#Catalog", "https://example.org/catalogs2", "#reg3");

// const serializer = new RdfjsJsonLdSerializer();
// serializer.serialize(typeIndexWithChangelog).then(json => console.log(json));
// console.log(typeIndexWithChangelog.getRegistrationAllForClass("http://www.example.org/types#Catalog"));

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

const loader = new LoaderRdfjs();

// const promise = loader.load<TypeIndex>("", new TypeIndexFactory(DocumentImpl, ThingImpl<TypeIndexStatement>, ThingImplDefault, StatementImpl));
// promise.then(ti => ti.getRegistrationAllForClass(""));

const webId = "http://localhost:8000/lecoqlibre/profile/card#me";
const pWid = loader.load<WebIdProfile>(webId, new WebIdProfileFactory(DocumentImpl, ThingImpl));
pWid.then(wip => console.log(wip));
