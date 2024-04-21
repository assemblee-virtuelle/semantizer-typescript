import { DocumentWithChangelogImpl } from './changelog/DocumentWithChangelogImpl.js';
import DocumentImpl from './core-default/DocumentImpl.js';
import DocumentDecoratedImpl from './core/Decorated.js';
import { Document, Statement } from './core/Document.js';
import { DocumentLocalImpl } from './synchronized/DocumentSynchronizedImpl.js';
import { TypeIndex, TypeIndexStatement } from './type-index/TypeIndex.js';
import { TypeIndexImpl, TypeIndexLocalImpl } from './type-index/TypeIndexImpl.js';

export { default as Semantizer } from './Semantizer.js';

const document = new DocumentDecoratedImpl(new DocumentImpl);
// const getted = document.getStatement("", "");

// const documentReadonly = document as Document;
// documentReadonly.getStatementAboutSelf("");

// document.forEach(s => console.log(s.getSubject(), s.getValue()));

// const typeIndexFactory = new TypeIndexFactory(DocumentImpl, ThingImpl<Statement<TypeIndexRegistration>, TypeIndex>, ThingImpl<Statement<TypeIndexSelfDescribingThing>, TypeIndex>, StatementImpl) ;//DocumentImpl<TypeIndex, TypeIndexReadonly>);

const typeIndexDocument = new TypeIndexImpl(new DocumentImpl<TypeIndexStatement>);
// typeIndexDocument.getStatementAboutSelf("").getSubject();
// typeIndexDocument.getStatement("", "").isForClass("");
// typeIndexDocument.deleteContext();

const typeIndexReadonly = typeIndexDocument as TypeIndex;

// typeIndexDocument.createThingToSelfDescribe();
// typeIndexDocument.createThingWithUri("test")
// .createStatement("solid:pred1", "solid:value1")
// .createStatement("solid:pred2", "solid:value2");
//.save();


console.log("-------");

// typeIndexDocument.forEach(s => console.log(s.getSubject(), s.getValue()));
// typeIndexDocument.forEachOfClass("class", s => console.log(s.getSubject(), s.getValue()));

// const documentWithChangelog = new DocumentWithChangelogImpl(new DocumentImpl);
// const typeIndexChangelog = new DocumentLocalImpl(new DocumentWithChangelogImpl<TypeIndexStatement>(new DocumentImpl<TypeIndexStatement>));

const typeIndexLocal = new TypeIndexLocalImpl(new DocumentLocalImpl(new DocumentWithChangelogImpl<TypeIndexStatement>(new DocumentImpl<TypeIndexStatement>)));

typeIndexLocal.saveUpdate();

// Décoration ou composition ? Ou les deux ?
// Comment implémenter le type index avec changelog ?
// Il faut que l'interface cliente contienne getChangelog() donc pas le choix, 
// l'implementation du type index doit implémenter l'interface WithChangelog.

// Et ensuite pour l'enregistrement sur le POD, il faut implémenter WithIO. Passer 
// l'implémentation SolidStorageImpl avec save().

// TypeIndexDecorator?
