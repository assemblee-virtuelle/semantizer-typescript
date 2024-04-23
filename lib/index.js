var _a, _b;
import { DocumentWithChangelogMixin } from './changelog/DocumentWithChangelogImpl.js';
import DocumentImpl, { DocumentImplDefault } from './core-default/DocumentImpl.js';
import StatementImpl from './core-default/StatementImpl.js';
import ThingImpl, { ThingImplDefault } from './core-default/ThingImpl.js';
import { DocumentLocalMixin } from './synchronized/DocumentSynchronizedImpl.js';
import { TypeIndexMixin } from './type-index/TypeIndexImpl.js';
import TypeIndexRegistrationMixin from './type-index/TypeIndexRegistrationImpl.js';
const document = new DocumentImplDefault;
const statement = document.createStatement("https://example.org/about", "https://example.org/property", "value");
// const getted = document.getStatement("https://example.org/about", "https://example.org/property");
// const documentReadonly = document as Document;
// documentReadonly.getStatementAboutSelf("");
// document.forEach(s => console.log(s.getSubject(), s.getValue()));
// const typeIndexFactory = new TypeIndexFactory(DocumentImpl, ThingImpl<Statement<TypeIndexRegistration>, TypeIndex>, ThingImpl<Statement<TypeIndexSelfDescribingThing>, TypeIndex>, StatementImpl) ;//DocumentImpl<TypeIndex, TypeIndexReadonly>);
const TypeIndexImpl = TypeIndexMixin(DocumentImpl); // <TypeIndexRegistration, Thing, TypeIndexRegistrationImpl, ThingImpl>
// export class TypeIndexRegistrationThingImpl extends ThingImpl<TypeIndexStatement> {
//     public constructor() {
//         super(TypeIndexRegistrationStatementMixin(StatementImpl));
//     }
// }
// const TypeIndexRegistrationImpl = TypeIndexRegistrationMixin(TypeIndexRegistrationThingImpl);
const TypeIndexRegistrationImpl = TypeIndexRegistrationMixin(ThingImpl, StatementImpl); // Todo: couple together?
const typeIndexDocument = new TypeIndexImpl(TypeIndexRegistrationImpl, ThingImplDefault); //(new DocumentImpl<TypeIndexStatement>);
// typeIndexDocument.createRegistrationForInstance("dfc-b:Catalog", "https://instance");
// typeIndexDocument.forEach(t => console.log(t));
// typeIndexDocument.getStatementAboutSelf("").getSubject();
// typeIndexDocument.getStatement("", "").isForClass("");
// typeIndexDocument.deleteContext();
// const typeIndexReadonly = typeIndexDocument as TypeIndex;
// // typeIndexDocument.createThingToSelfDescribe();
// // typeIndexDocument.createThingWithUri("test")
// // .createStatement("solid:pred1", "solid:value1")
// // .createStatement("solid:pred2", "solid:value2");
// //.save();
const TypeIndexWithChangelog = TypeIndexMixin(DocumentWithChangelogMixin(DocumentImpl)); //DocumentWithChangelogMixin(TypeIndexMixin(DocumentImpl)); //DocumentWithChangelogMixin(TypeIndexImpl);
const typeIndexWithChangelog = new TypeIndexWithChangelog(TypeIndexRegistrationImpl, ThingImplDefault); //new TypeIndexImpl(new DocumentImpl<TypeIndexStatement>()));
typeIndexWithChangelog.createRegistrationForInstance("dfc-b:Catalog", "https://instance");
typeIndexWithChangelog.forEach(t => console.log(t));
console.log(typeIndexWithChangelog.getChangelog());
(_b = (_a = typeIndexWithChangelog.getThing("")) === null || _a === void 0 ? void 0 : _a.getStatement("")) === null || _b === void 0 ? void 0 : _b.isForClass("");
// console.log("-------");
// // typeIndexDocument.forEach(s => console.log(s.getSubject(), s.getValue()));
// // typeIndexDocument.forEachOfClass("class", s => console.log(s.getSubject(), s.getValue()));
// // const documentWithChangelog = new DocumentWithChangelogImpl(new DocumentImpl);
// // const typeIndexChangelog = new DocumentLocalImpl(new DocumentWithChangelogImpl<TypeIndexStatement>(new DocumentImpl<TypeIndexStatement>));
const TypeIndexLocal = DocumentLocalMixin(DocumentWithChangelogMixin(TypeIndexMixin(DocumentImpl)));
const typeIndexLocal = new TypeIndexLocal(TypeIndexRegistrationImpl, ThingImpl); //new DocumentImpl<TypeIndexStatement>);
// typeIndexLocal.createRegistrationForInstance("dfc-b:Catalog", "https://example.org/instance");
// typeIndexLocal.createRegistrationForInstanceContainer("dfc-b:Catalog", "httsp://example.org/catalogs");
// typeIndexLocal.forEach(s => console.log(s.getSubject(), s.getProperty(), s.getValue()));
// console.log(typeIndexLocal.getChangelog().getAdded());
// const thing = document.getThing();
// thing.createStatement("prop", "value");
// document.setThing("https://...", thing);
typeIndexLocal.saveUpdate();
// Décoration ou composition ? Ou les deux ?
// Comment implémenter le type index avec changelog ?
// Il faut que l'interface cliente contienne getChangelog() donc pas le choix, 
// l'implementation du type index doit implémenter l'interface WithChangelog.
// Et ensuite pour l'enregistrement sur le POD, il faut implémenter WithIO. Passer 
// l'implémentation SolidStorageImpl avec save().
// TypeIndexDecorator?
//# sourceMappingURL=index.js.map