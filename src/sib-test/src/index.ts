import { LoaderRdfjs } from "@semantizer/loader-rdfjs";
import { MixinFactory } from "@semantizer/mixins";
import { DatasetImpl, DatasetMixin } from "@semantizer/core-rdfjs";
import { Statement, Thing } from "@semantizer/types";
import { WebIdProfile, WebIdProfileMixin } from "@semantizer/webid";
import { SolidWebIdProfile, SolidWebIdProfileMixin } from "@semantizer/solid-webid";
import { TypeIndex, TypeIndexMixin } from "@semantizer/typeindex";
import { IndexMixin } from "@semantizer/index";
import dataFactory from "@rdfjs/data-model";

/*

MIXIN DEDIE SIB FREELANCE ?

- Remove template parameters? getThing() => Thing
- 
- soit on récupére uniquement des URI et on construit après comme on veut le document
- soit on récupère un document générique qu'on peut ensuite convertir comme on veut en ajoutant des mixins
- soit on peut directement récupérer un objet concret en passant une factory: cette solution permet de gérer les 3 cas avec une factory d'URI, de document et de type concret

getPublicTypeIndex<T>(callback: (uri: string): T): T {
        return callback("solid:publicTypeIndex");
    }

    async getPublicTypeIndex<T>(factory: Factory<T>): Promise<T> {
        const uri = this.get("solid:publicTypeIndex");
        return await factory.load<T>(uri);
    }

    const publicTypeIndex: TypeIndex = profileDocument.getPublicTypeIndex(typeIndexFactory);
*/

const loader = new LoaderRdfjs();
const DatasetMixinImpl = DatasetMixin(DatasetImpl);
const WebIdMixinImpl = WebIdProfileMixin(DatasetMixinImpl);
const SolidWebIdProfileMixinImpl = SolidWebIdProfileMixin(WebIdMixinImpl);
const TypeIndexMixinImpl = TypeIndexMixin(DatasetMixinImpl);
const IndexMixinImpl = IndexMixin(DatasetMixinImpl);

const test = async () => {
    const webId = "https://api.test-inria-index.startinblox.com/fedex/profile#me";

    // 1. Load the WebId of the instance
    const datasetCore = await loader.load(webId);
    const dataset = new DatasetMixinImpl(datasetCore);
    dataset.setUri(webId); // TODO: PB here, the URI should be set automatically
    const profileDocument = new WebIdMixinImpl(dataset);
    const profile = profileDocument.getPrimaryTopic();

    if (profile.isEmpty()) {
        throw new Error("Profile is empty");
    }

    const solidProfile = new SolidWebIdProfileMixinImpl(profileDocument);
    await profileDocument.load(solidProfile.getSeeAlso(), loader); // load the extended profile

    // 2. Get the public type index
    const publicTypeIndex = solidProfile.getPublicTypeIndex(); // TODO? new TypeIndexFactory);
    await publicTypeIndex.load(loader); // TODO: load(loader) to load self || autoload ?
    const typeIndex = new TypeIndexMixinImpl(publicTypeIndex);

    // 3. Find the meta meta-index(es)
    // const metaIndexes: TypeIndexRegistration[] = publicTypeIndex.getRegistrationForClassAll("https://ns.inria.fr/idx/terms#Index");
    // Use callbacks to get registrations as stream or use stream directly?
    const metaMetaIndex = typeIndex.getInstanceForClass('https://ns.inria.fr/idx/terms#Index');
    await metaMetaIndex.load(loader);
    // console.log(metaMetaIndex);

    const metaMetaIndexMixin = new IndexMixinImpl(metaMetaIndex);

    const skills = metaMetaIndexMixin.match(
        undefined, 
        dataFactory.namedNode("https://www.w3.org/ns/shacl#path"),
        dataFactory.namedNode("http://cdn.startinblox.com/owl/ttl/vocab.ttl#skills")
    );

    for (const q of skills) {
        const property = metaMetaIndexMixin.match(
            undefined,
            dataFactory.namedNode("https://www.w3.org/ns/shacl#property"),
            q.subject
        )
        for (const qq of property) {
            const shape = metaMetaIndexMixin.match(
                undefined,
                dataFactory.namedNode("https://ns.inria.fr/idx/terms#hasShape"),
                qq.subject
            )
            for (const qqq of shape) {
                const entryDataset = qqq.subject;
                // await entry.load(entry, loader);
                const entry = metaMetaIndexMixin.getThing(entryDataset.value);
                try {
                    const subIndexDataset = entry.getObject("https://ns.inria.fr/idx/terms#hasSubIndex");
                    await subIndexDataset.load(loader);
                }
                catch(e) {
                    console.log("No sub index");
                }
            }
        }
        // for (const qq of metaMetaIndexMixin.match(q.subject)) {
        //     console.log(qq.subject)
        // }
    }



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