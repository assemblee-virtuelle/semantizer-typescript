import toNT from '@rdfjs/to-ntriples';
import datasetFactory from '@rdfjs/dataset';
// import normalize from '@rdfjs/normalize';
import { Dataset, DatasetCore, Quad, Stream, Term } from "@rdfjs/types";

export class DatasetImpl implements Dataset {

    private _datasetCore: DatasetCore<Quad, Quad>;
    public size: number;

    public constructor(quads?: Iterable<Quad>) {
        const quadArray = quads? Array.from(quads) : undefined;
        this._datasetCore = datasetFactory.dataset(quadArray);
        this.size = this._datasetCore.size;
    }

    public [Symbol.iterator](): Iterator<Quad> {
        return this._getDatasetCore()[Symbol.iterator]();
    }
    
    protected _create(quads?: Iterable<Quad>): DatasetImpl {
        return new DatasetImpl(quads);
    }

    private _getDatasetCore(): DatasetCore<Quad, Quad> {
        return this._datasetCore;
    }

    public add(quad: Quad): this {
        const resultDataset = this._getDatasetCore().add(quad);
        this.size = resultDataset.size;
        return this._create(resultDataset) as this;
    }

    public delete(quad: Quad): this {
        const resultDataset = this._getDatasetCore().delete(quad);
        this.size = resultDataset.size;
        return this._create(resultDataset) as this;
    }

    public has(quad: Quad): boolean {
        return this._getDatasetCore().has(quad);
    }

    public addAll(quads: Quad[] | Dataset<Quad, Quad>): this {
        for (const quad of quads) {
            this.add(quad);
        }
        return this;
    }

    public contains(other: Dataset<Quad, Quad>): boolean {
        throw new Error('Method not implemented.');
    }

    public deleteMatches(subject?: Term | undefined, predicate?: Term | undefined, object?: Term | undefined, graph?: Term | undefined): this {
        for (const quad of this.match(subject, predicate, object, graph)) {
            this.delete(quad);
        }
        return this;
    }

    public difference(other: Dataset<Quad, Quad>): Dataset<Quad, Quad> {
        return this.filter(quad => !other.has(quad));
    }

    public equals(other: Dataset<Quad, Quad>): boolean {
        return this.toCanonical() === other.toCanonical();
    }

    public every(iteratee: (quad: Quad, Dataset: this) => boolean): boolean {
        return Array.from(this).every(quad => iteratee(quad, this));
    }

    public filter(iteratee: (quad: Quad, Dataset: this) => boolean): Dataset<Quad, Quad> {
        return this._create(Array.from(this).filter(quad => iteratee(quad, this)));
    }

    public forEach(callback: (quad: Quad, Dataset: this) => void): void {
        Array.from(this).forEach(quad => callback(quad, this));
    }

    public import(stream: Stream<Quad>): Promise<this> {
        // import { finished, Readable } from 'readable-stream'

        // stream.on('data', quad => this.add(quad));

        // return new Promise((resolve, reject) => {
        //     finished(stream, err => {
        //         if (err) {
        //         reject(err)
        //         } else {
        //         resolve(this)
        //         }
        //     })
        // })
        throw new Error('Method not implemented.');
    }

    public intersection(other: Dataset<Quad, Quad>): Dataset<Quad, Quad> {
        return this.filter(quad => other.has(quad));
    }

    public map(iteratee: (quad: Quad, dataset: Dataset<Quad, Quad>) => Quad): Dataset<Quad, Quad> {
        return this._create(Array.from(this).map(quad => iteratee(quad, this)));
    }

    public reduce<A = any>(callback: (accumulator: A, quad: Quad, dataset: this) => A, initialValue: A): A {
        return Array.from(this).reduce<A>((value, quad, index) => callback(value, quad, this), initialValue);
    }

    public some(iteratee: (quad: Quad, dataset: this) => boolean): boolean {
        return Array.from(this).some(quad => iteratee(quad, this));
    }

    public toArray(): Quad[] {
        return Array.from(this);
    }

    public toCanonical(): string {
        throw new Error('Method not implemented.');
        //return normalize(this);
    }

    public toStream(): Stream<Quad> {
        throw new Error('Method not implemented.');
        // return Readable.from(this)
    }

    public toString(): string {
        return toNT(this);
    }

    public union(quads: Dataset<Quad, Quad>): Dataset<Quad, Quad> {
        throw new Error('Method not implemented.');
        // return (this.clone()).addAll(other)
    }

    public match(subject?: Term | null | undefined, predicate?: Term | null | undefined, object?: Term | null | undefined, graph?: Term | null | undefined): Dataset<Quad, Quad> {
        const datasetCore = this._getDatasetCore().match(subject, predicate, object, graph);
        return this._create(datasetCore);
    }


}

export default DatasetImpl;