import { DocumentWithChangelogMixin } from './changelog/DocumentWithChangelogImpl.js';
import { DocumentImplDefault } from './core-default/DocumentImpl.js';
import { DocumentLocalMixin } from './synchronized/DocumentSynchronizedImpl.js';
import { TypeIndexMixin } from './type-index/TypeIndexImpl.js';
const document = new DocumentImplDefault;
const statement = document.createStatement("https://example.org/about", "https://example.org/property", "value");
const getted = document.getStatement("https://example.org/about", "https://example.org/property");
console.log(getted === null || getted === void 0 ? void 0 : getted.getValue());
// const documentReadonly = document as Document;
// documentReadonly.getStatementAboutSelf("");
// document.forEach(s => console.log(s.getSubject(), s.getValue()));
// const typeIndexFactory = new TypeIndexFactory(DocumentImpl, ThingImpl<Statement<TypeIndexRegistration>, TypeIndex>, ThingImpl<Statement<TypeIndexSelfDescribingThing>, TypeIndex>, StatementImpl) ;//DocumentImpl<TypeIndex, TypeIndexReadonly>);
const TypeIndexImpl = TypeIndexMixin(DocumentImplDefault);
const typeIndexDocument = new TypeIndexImpl(); //(new DocumentImpl<TypeIndexStatement>);
// typeIndexDocument.getStatementAboutSelf("").getSubject();
// typeIndexDocument.getStatement("", "").isForClass("");
// typeIndexDocument.deleteContext();
const typeIndexReadonly = typeIndexDocument;
// typeIndexDocument.createThingToSelfDescribe();
// typeIndexDocument.createThingWithUri("test")
// .createStatement("solid:pred1", "solid:value1")
// .createStatement("solid:pred2", "solid:value2");
//.save();
const TypeIndexWithChangelog = DocumentWithChangelogMixin(TypeIndexImpl);
const typeIndexWithChangelog = new TypeIndexWithChangelog(); //new TypeIndexImpl(new DocumentImpl<TypeIndexStatement>()));
typeIndexWithChangelog.getChangelog();
console.log("-------");
// typeIndexDocument.forEach(s => console.log(s.getSubject(), s.getValue()));
// typeIndexDocument.forEachOfClass("class", s => console.log(s.getSubject(), s.getValue()));
// const documentWithChangelog = new DocumentWithChangelogImpl(new DocumentImpl);
// const typeIndexChangelog = new DocumentLocalImpl(new DocumentWithChangelogImpl<TypeIndexStatement>(new DocumentImpl<TypeIndexStatement>));
const TypeIndexLocal = DocumentLocalMixin(DocumentWithChangelogMixin(TypeIndexMixin(DocumentImplDefault)));
const typeIndexLocal = new TypeIndexLocal(); //new DocumentImpl<TypeIndexStatement>);
typeIndexLocal.createRegistrationForInstance("dfc-b:Catalog", "https://example.org/instance");
typeIndexLocal.createRegistrationForInstanceContainer("dfc-b:Catalog", "httsp://example.org/catalogs");
typeIndexLocal.forEach(s => console.log(s.getSubject(), s.getProperty(), s.getValue()));
console.log(typeIndexLocal.getChangelog().getAdded());
//typeIndexLocal.saveUpdate();
// Décoration ou composition ? Ou les deux ?
// Comment implémenter le type index avec changelog ?
// Il faut que l'interface cliente contienne getChangelog() donc pas le choix, 
// l'implementation du type index doit implémenter l'interface WithChangelog.
// Et ensuite pour l'enregistrement sur le POD, il faut implémenter WithIO. Passer 
// l'implémentation SolidStorageImpl avec save().
// TypeIndexDecorator?
//# sourceMappingURL=index.js.map