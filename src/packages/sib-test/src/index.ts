import semantizer from "@semantizer/default";
import dataFactory from "@rdfjs/data-model";
import { typeIndexFactory } from "@semantizer/mixin-typeindex";
import { solidWebIdProfileFactory } from "@semantizer/mixin-solid-webid";
import indexFactory, { indexEntryFactory, indexShapeFactory } from "@semantizer/mixin-index";

/*
TODO:
- Mixin dedicated to sib freelance ?
- Use callbacks to get registrations as stream or use stream directly?
*/

// Expliciter la forme des shapes => doivent être ultra contraintes 1 path + 1 value (pas forcément valuée)
// Soit aucune contrainte sur la valeur, soit une valeur précise
// Rajouter les regex plus tard
const test = async () => {
    try {
        const webIdUri = "https://api.test-inria-index.startinblox.com/fedex/profile#me";

        // 1. Load the WebId of the instance
        const webIdProfile = await semantizer.load(webIdUri, solidWebIdProfileFactory);
        await webIdProfile.loadExtendedProfile();
        const webId = webIdProfile.getPrimaryTopic();

        // 2. Get the public type index
        const publicTypeIndex = webId.getPublicTypeIndex();

        if (!publicTypeIndex) {
            throw new Error("TypeIndex was not found.");
        }

        await publicTypeIndex.load();

        // 3. Find the index from the TypeIndex
        const indexDataset = publicTypeIndex.getRegisteredInstanceForClass('https://ns.inria.fr/idx/terms#Index');

        if (!indexDataset) {
            throw new Error("Index was not found.");
        }

        await indexDataset.load();

        // 4. Build the index mixin
        const index = semantizer.build(indexFactory, indexDataset);

        // 5. Construct the shape
        const shape = semantizer.build(indexShapeFactory);
        shape.addProperty(dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), dataFactory.namedNode("http://cdn.startinblox.com/owl/ttl/vocab.ttl#User"));
        shape.addProperty(dataFactory.namedNode("http://cdn.startinblox.com/owl/ttl/vocab.ttl#skills"), dataFactory.namedNode("https://api.test-inria2.startinblox.com/skills/1/"));

        // 6. Execute the query
        await index.findTargetsRecursively(shape, (t) => console.log("!!! RESULT !!! " + t.getOrigin()?.value), 5);
    }
    
    catch (e) {
        console.warn(e);
    }

}

test();