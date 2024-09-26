import semantizer from "@semantizer/default";
import { typeIndexFactory } from "@semantizer/mixin-typeindex";
import { solidWebIdProfileFactory } from "@semantizer/mixin-solid-webid";
import indexFactory, { indexEntryFactory, indexShapeFactory } from "@semantizer/mixin-index";

/*
TODO:
- It might be interesting to add a mixin dedicated to SiB freelance. This way, updates can be made to the index mixin without the need to change SiB code.
- The method findTargetsRecursively should return a stream so the querying can be paused and resumed.
- Should the SolidWebIdProfileMixin let the client decide which mixin he want to use instead of giving him defaults (like getPublicTypeIndex() --> TypeIndex)?
*/
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

        // 4. Build the index mixin
        const index = semantizer.build(indexFactory, indexDataset);

        // 5. Construct the shape
        const shape = semantizer.build(indexShapeFactory);
        const dataFactory = semantizer.getConfiguration().getRdfDataModelFactory();
        // shape.setTargetRdfType('http://cdn.startinblox.com/owl/ttl/vocab.ttl#User');
        shape.addProperty(dataFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), dataFactory.namedNode("http://cdn.startinblox.com/owl/ttl/vocab.ttl#User"));
        // shape.addProperty(dataFactory.namedNode("http://cdn.startinblox.com/owl/ttl/vocab.ttl#skills"), dataFactory.namedNode("https://api.test-inria2.startinblox.com/skills/99/"));
        shape.addProperty(dataFactory.namedNode("http://cdn.startinblox.com/owl/ttl/vocab.ttl#city"), dataFactory.literal("paris"));

        // 6. Execute the query to find targets using streams to read the indexes
        // TODO: here we should return a stream instead of taking a callback parameter. This way, the querying could be paused and resumed.
        await index.findTargetsRecursively(shape, (t) => console.log("!!! RESULT !!! " + t.getOrigin()?.value), 5);
    }
    
    catch (e) {
        console.warn(e);
    }

}

test();