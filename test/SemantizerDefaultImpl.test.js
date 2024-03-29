import expect from 'node:assert';
import { test } from 'node:test';
import rdf from 'rdf-ext';
import SemantizerDefault from "../lib/SemantizerDefaultImple.js";
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import { Readable } from 'readable-stream';

const semantizer = new SemantizerDefault();

test("DocumentDefaultImpl:createWithoutUri", () => {
    let document = semantizer.createDocument();
    expect.strictEqual(document.getUri(), "");
});

test("DocumentDefaultImpl:createWithUri", () => {
    let document = semantizer.createDocument("http://example.org/document");
    expect.strictEqual(document.getUri(), "http://example.org/document");
})