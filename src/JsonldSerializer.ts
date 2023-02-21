import rdf from 'rdf-ext'
import { JsonLdParser } from 'jsonld-streaming-parser';
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import { Readable } from 'stream';
import DatasetExt from 'rdf-ext';
import QuadExt from 'rdf-ext/lib/Quad';
import DataFactoryExt from 'rdf-ext';
import Dataset from 'rdf-ext';

export default class JsonldSerializer {

    private parser;
    private serializer;

    constructor() {
        this.parser = new JsonLdParser();
        this.serializer = new SerializerJsonld({ compact: true });
    }

    public serialize(context: any) {
        this.serializer.setContext(context);

        const input = new Readable({
          objectMode: true,
          read: () => {
            this.dataset.forEach((quad) => input.push(quad))
            input.push(null)
          }
        })
        
        const output = serializerJsonld.import(input);
    
        return new Promise(function(resolve, reject) {
          output.once('data', function(e) {
            resolve(JSON.stringify(e)); // done
          });
        });
    }

    public async unserialize(json: string) {
        const datasets: Map<string, DatasetExt> = new Map();
    
        const input = new Readable();
        input.push(json);
        input.push(null);
    
        this.parser.import(input).on('data', (quad: any) => {
            const subject = quad.subject.value;
            const dataset: DatasetExt | undefined = datasets.get(subject);
        
            if (dataset) {
                dataset.add(quad);
            }
        
            else {
                datasets.set(subject, new DatasetExt());
            }
        });
    
        return new Promise((resolve, reject) => this.parser.import(input).on('finish', () => resolve(datasets)));
    }
}