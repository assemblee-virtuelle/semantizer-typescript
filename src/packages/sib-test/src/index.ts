import semantizer from "@semantizer/default";
import { DatasetSemantizer } from "@semantizer/types";
import { solidWebIdProfileFactory } from "@semantizer/mixin-solid-webid";
import indexFactory, { indexShapeFactory } from "@semantizer/mixin-index";
import IndexStrategyConjunction from "@semantizer/mixin-index-strategy-conjunction";

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
            throw new Error("The TypeIndex was not found.");
        }

        await publicTypeIndex.load();

        // 3. Find the index from the TypeIndex
        const indexDataset = publicTypeIndex.getRegisteredInstanceForClass('https://ns.inria.fr/idx/terms#Index');

        if (!indexDataset) {
            throw new Error("The meta-meta index was not found.");
        }

        // 4. Build the index mixin
        const index = semantizer.build(indexFactory, indexDataset);

        // 5. Construct the shape
        const shape = semantizer.build(indexShapeFactory);
        const dataFactory = semantizer.getConfiguration().getRdfDataModelFactory();
        shape.addTargetRdfType(dataFactory.namedNode("http://cdn.startinblox.com/owl/ttl/vocab.ttl#User"));

        shape.addPatternProperty(
            dataFactory.namedNode("http://cdn.startinblox.com/owl/ttl/vocab.ttl#firstName"), 
            dataFactory.literal("adr.*")
        );
        
        shape.addValueProperty(
            dataFactory.namedNode("http://cdn.startinblox.com/owl/ttl/vocab.ttl#city"), 
            dataFactory.literal("paris")
        );
        
        shape.addValueProperty(
            dataFactory.namedNode("http://cdn.startinblox.com/owl/ttl/vocab.ttl#skills"), 
            dataFactory.namedNode("https://api.test-inria2.startinblox.com/skills/2/")
        );

        // 6. Execute the query to find targets using streams to read the indexes
        const strategy = new IndexStrategyConjunction(semantizer);
        const resultCallback = (user: DatasetSemantizer) => console.log("!!! RESULT !!! ", user.getOrigin()?.value);
        await index.findTargetsRecursively(strategy, shape, resultCallback, 5);
    }
    
    catch (e) {
        console.warn(e);
    }

}

test();