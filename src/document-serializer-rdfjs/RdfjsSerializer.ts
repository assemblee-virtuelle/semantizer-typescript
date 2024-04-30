import { DocumentSerializer, JsonLdSerializable } from "../core/Serializable";
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import { Readable } from 'readable-stream';
import { DocumentWithNonDestructiveOperations } from "../core/Document";
import { ThingWithNonDestructiveOperations, Thing } from "../core/Thing";
import { Statement } from "../core/Statement";
import rdf from 'rdf-ext';

export class RdfjsJsonLdSerializer implements DocumentSerializer {

    public async serialize(document: DocumentWithNonDestructiveOperations<any, any>): Promise<string> {
        const serializer = new SerializerJsonld({ compact: true }); //, context: context });

        const input = new Readable({
            objectMode: true,
            read: () => {
                document.forEach(
                    (thing: ThingWithNonDestructiveOperations<any>) => thing.forEach(
                        (statement: Statement) => {
                            input.push(
                                rdf.quad(
                                    rdf.namedNode(statement.getSubject()),
                                    rdf.namedNode(statement.getProperty()),
                                    rdf.literal(statement.getValue())
                                )
                            )
                        }
                    )
                );  
                input.push(null);
            }
        });

        let result: string = "";
        
        const output = serializer.import(input);
        output.on("data", (json) => result = json);

        const promise = new Promise<string>((resolve, reject) => {
            output.on('end', () => resolve(result));
        });

        return promise;
    }
    
}