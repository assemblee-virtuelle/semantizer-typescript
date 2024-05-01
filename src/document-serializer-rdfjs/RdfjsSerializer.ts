import { DocumentSerializer, JsonLdSerializable } from "../core/Serializable";
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import { Readable } from 'readable-stream';
import { IterableDocument } from "../core/Document";
import { ThingWithNonDestructiveOperations, Thing, IterableThing } from "../core/Thing";
import { Statement, StatementWithDestructiveOperations } from "../core/Statement";
import rdf from 'rdf-ext';
import QuadExt from "rdf-ext/lib/Quad";

export class RdfjsJsonLdSerializer implements DocumentSerializer {

    private makeQuadsFromThing(thing: IterableThing<any>): QuadExt[] {
        const quads = [];
        for (const statement of thing) {
            quads.push(this.makeQuadFromStatement(statement))
        }
        return quads;
    }

    private makeQuadFromStatement(statement: StatementWithDestructiveOperations): QuadExt {
        return rdf.quad(
            rdf.namedNode(statement.getSubject()),
            rdf.namedNode(statement.getProperty()),
            rdf.namedNode(statement.getValue())
        );
    }

    public async serialize(document: IterableDocument<any, any>): Promise<string> {
        const context = { "solid": "http://www.w3.org/ns/solid/terms#" };
        const serializer = new SerializerJsonld({ compact: true, context: context });

        const input = new Readable({
            objectMode: true,
            read: () => {
                const selfDescribingThing = document.getThingAboutSelf();
                if (selfDescribingThing) {
                    this.makeQuadsFromThing(selfDescribingThing).forEach(quad => input.push(quad));
                }

                for (const thing of document) {
                    this.makeQuadsFromThing(thing).forEach(quad => input.push(quad));
                }

                input.push(null);
            }
        });

        let result: string = "";
        
        const output = serializer.import(input);
        output.on("data", (json) => result = JSON.stringify(json));

        const promise = new Promise<string>((resolve, reject) => {
            output.on('end', () => resolve(result));
            output.on('error', (err) => reject(err));
        });

        return promise;
    }
    
}