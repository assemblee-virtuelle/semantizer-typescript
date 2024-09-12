import semantizer from "@semantizer/core-default";
import dataFactory from "@rdfjs/data-model";
import { SolidWebIdProfileFactory } from "@semantizer/solid-webid";
import indexFactory, { indexEntryFactory, indexShapeFactory } from "@semantizer/index";

/*
TODO:
- Mixin dedicated to sib freelance ?
- Use callbacks to get registrations as stream or use stream directly?
*/

const test = async () => {
    const webIdUri = "https://api.test-inria-index.startinblox.com/fedex/profile#me";

    // 1. Load the WebId of the instance
    const profileDocument = await semantizer.load(webIdUri, SolidWebIdProfileFactory);
    await profileDocument.loadExtendedProfile();
    const webId = profileDocument.getPrimaryTopic(); // if load() returns this, can be done on a single line
    const solidWebId = semantizer.build(SolidWebIdProfileFactory, webId);

    // 2. Get the public type index
    const publicTypeIndex = solidWebId.getPublicTypeIndex(); // should be solidProfile instead of solidProfileDocument
    await publicTypeIndex.load();

    // 3. Find the index from the TypeIndex
    const indexDataset = publicTypeIndex.getRegisteredInstanceForClass('https://ns.inria.fr/idx/terms#Index');
    await indexDataset.load();
    console.log(indexDataset);

    // Expliciter la forme des shapes => doivent être ultra contraintes 1 path + 1 value (pas forcément valuée)
    // Soit aucune contrainte sur la valeur, soit une valeur précise
    // Rajouter les regex plus tard
    const shape = semantizer.build(indexShapeFactory);
    shape.addProperty(dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), dataFactory.namedNode("https://cdn.startinblox.com/owl#User"));
    shape.addProperty(dataFactory.namedNode("https://cdn.startinblox.com/owl#skills"), dataFactory.namedNode("https://api.test-inria2.startinblox.com/skills/1/"));

    // const shape2 = semantizer.build(indexShapeFactory);
    // shape.addProperty(dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), dataFactory.namedNode("https://cdn.startinblox.com/owl#User"));
    // shape.addProperty(dataFactory.namedNode("https://cdn.startinblox.com/owl#city"), dataFactory.literal("Paris"));

    // console.log(shape);

    const index = semantizer.build(indexFactory, indexDataset);
    // index.forEachThing(t => {
    //     const entry = semantizer.build(indexEntryFactory, t);
    //     console.log(entry.getUri(), entry.validateShape(shape2, 1));
    // }, 'https://ns.inria.fr/idx/terms#IndexEntry');

    await index.findTargetsRecursively(shape, (t) => console.log(t.getUri()), 5);






    // const metaMetaIndexMixin = new IndexMixinImpl(metaMetaIndex);

    // const skills = metaMetaIndexMixin.match(
    //     undefined, 
    //     dataFactory.namedNode("https://www.w3.org/ns/shacl#path"),
    //     dataFactory.namedNode("http://cdn.startinblox.com/owl/ttl/vocab.ttl#skills")
    // );

    // for (const q of skills) {
    //     const property = metaMetaIndexMixin.match(
    //         undefined,
    //         dataFactory.namedNode("https://www.w3.org/ns/shacl#property"),
    //         q.subject
    //     )
    //     for (const qq of property) {
    //         const shape = metaMetaIndexMixin.match(
    //             undefined,
    //             dataFactory.namedNode("https://ns.inria.fr/idx/terms#hasShape"),
    //             qq.subject
    //         )
    //         for (const qqq of shape) {
    //             const entryDataset = qqq.subject;
    //             // await entry.load(entry, loader);
    //             const entry = metaMetaIndexMixin.getThing(entryDataset.value);
    //             try {
    //                 const subIndexDataset = entry.getObject("https://ns.inria.fr/idx/terms#hasSubIndex");
    //                 await subIndexDataset.load(loader);
    //             }
    //             catch(e) {
    //                 console.log("No sub index");
    //             }
    //         }
    //     }

        // for (const qq of metaMetaIndexMixin.match(q.subject)) {
        //     console.log(qq.subject)
        // }
    // }



    // const targets = await metaMetaIndexMixin.getTargets(
    //     loader,
    //     { path: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", value: "https://cdn.startinblox.com/owl#User" },
    //     { path: "https://cdn.startinblox.com/owl#skills", value: "https://api.test-inria2.startinblox.com/skills/1/"}
    // );
    // console.log(targets);

    /*
    const metaMetaIndex: Index[] = await publicTypeIndex.getInstanceAllForClass("https://ns.inria.fr/idx/terms#Index", loader?);
    
    if (metaMetaIndex.length === 0) {
        throw new Error("Unable to find a meta meta-index.");
    }

    // 4. In the meta meta-index, find the meta indexes we want to query:
    //  - If we want to search by name, select the first_name and last_name indexes;
    //  - If we want to search by skills, select the skill index;
    //  - If we want to search by cities, select the city index.
    // const metaMetaIndexDocument: Document = DocumentFactory.createFrom(metaMetaIndexDocuments);
    // const metaMetaIndex: Index = new Index(metaIndexDocument);
    const shapeSkills = new Shape(new Property("rdf:type", "sib:user"), new Property("sib:skills"));
    const skillMetaIndex: IndexEntry[] = metaMetaIndex.findEntry(shapeSkills);

    if (skillMetaIndex.length === 0) {
        throw new Error("Unable to find a skill meta-index.");
    }   

    // 5. Find the index
    const skillIndex: Index = skillMetaIndex.getSubIndex();

    // 6. Find the final indexes.
    const shapePHP = new Shape(new Property("sib:skill", "sib:skillPHP"));
    const finalSkillIndexes = skillIndex.findFinalIndexForShape(shapePHP);

    // 6. Query the final indexes to find matches.
    const entries = finalSkillIndexes.findEntry(shapePHP);
    const user = entries.getTarget();

    */
}

test();

  /*if (publicTypeIndexUri) {
        const loaderTypeIndex = new LoaderRdfjs<TypeIndexRegistration, Thing<TypeIndexStatement>>();
        const TypeIndexRegistrationImpl = TypeIndexRegistrationMixin(ThingImpl<TypeIndexStatement>);
        const typeIndexFactory = new MixinFactory(DocumentImpl<TypeIndexRegistration, Thing<TypeIndexStatement>>, new DocumentImplFactoryImpl(TypeIndexRegistrationImpl, ThingImpl<TypeIndexStatement>, StatementImpl))
        const publicTypeIndex = await typeIndexFactory.load<TypeIndex>(publicTypeIndexUri, (impl) => TypeIndexMixin(impl), loaderTypeIndex);        
        publicTypeIndex.forEachOfClass("https://ns.inria.fr/idx/terms#Index", r => console.log(r.getInstance()));
    }*/

    /*
    const typeIndexResource: Resource | string | Thing | Document = profile.getPublicTypeIndex();
    typeIndexResource.isBlankNode()?
    const typeIndex = typeIndexFactory.load(profile.getPublicTypeIndex());

    Un document peut contenir d'autres documents, notamment en JSON-LD, Trig ou ntriples...
    */