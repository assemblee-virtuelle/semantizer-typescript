import expect from 'node:assert';
import { test } from 'node:test';
import rdf from 'rdf-ext';
import SemantizerDefault from "../lib/SemantizerDefault.js";
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import { Readable } from 'readable-stream';

const semantizer = new SemantizerDefault();

test('Address:import', () => {
    const resource = semantizer.createSemanticResource({ 
        semanticId: "http://example.org/test",
        semanticType: "http://example.org/Type1"
    });
    resource.addValueForSemanticPropertyUrl("http://example.org/prop1", "http://example.org/value1");
    resource.addValueForSemanticPropertyString("http://example.org/prop2", "test");//, "fr");
    resource.addValueForSemanticPropertyInteger("http://example.org/propInteger", "3");
    //console.log(resource);

    const serializer = new SerializerJsonld({ compact: true }); //, context: context });

    const input = new Readable({
        objectMode: true,
        read: () => {
            //semanticObjets.forEach((semanticObject) => semanticObject.toRdfDatasetExt().forEach((quad) => input.push(quad)));
            resource.toRdfDatasetExt().forEach((quad) => input.push(quad));
            input.push(null)
        }
    });

    const output = serializer.import(input);

    //output.on("data", (json) => console.log(JSON.stringify(json)));

    const dataset = rdf.dataset();
    const blankNode = rdf.blankNode();
    const quad = rdf.quad(blankNode, "http://example.org/prop", rdf.literal("test"));
    const quad2 = rdf.quad(blankNode, "http://example.org/prop2", rdf.literal("test2"))
    dataset.add(quad);
    dataset.add(quad2);
    console.log(dataset);
});