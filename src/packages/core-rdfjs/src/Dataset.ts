import RdfjsDatasetImpl from "@semantizer/rdfjs-dataset-impl";
import { BlankNode, NamedNode, Quad, Semantizer, WithOrigin, WithSemantizer } from '@semantizer/types';

export class DatasetCoreRdfjsImpl extends RdfjsDatasetImpl implements WithSemantizer, WithOrigin {

    private _semantizer: Semantizer;
    private _origin: NamedNode | BlankNode | undefined;
    private _originDocument: NamedNode | undefined;
    private _originThing: NamedNode | BlankNode | undefined;

    public constructor(semantizer: Semantizer, origin?: NamedNode | BlankNode | string, quads?: Iterable<Quad>) {
        super(quads);
        this._semantizer = semantizer;
        if (origin) {
            this._origin = this.createNamedNode(origin);
            // this._originDocument = this.createNamedNode(origin);
            // this._originThing = this.createNamedNode(origin);
        }
    }
    
    public getSemantizer(): Semantizer {
        return this._semantizer;
    }

    protected _create(quads?: Iterable<Quad>): DatasetCoreRdfjsImpl {
        return new DatasetCoreRdfjsImpl(this._semantizer, this._originDocument, quads);
    }

    // TODO: move to a Utility class
    public createNamedNode(from: NamedNode | BlankNode | string): NamedNode | BlankNode {
        return typeof from === 'string'? this.getSemantizer().getConfiguration().getRdfDataModelFactory().namedNode(from): from;
    }

    public getOrigin(): NamedNode | BlankNode | undefined {
        return this._origin;
    }

    public setOrigin(origin: NamedNode | BlankNode): void {
        this._origin = origin;
    }

    public getOriginDocument(): NamedNode | undefined {
        return this._originDocument;
    }

    public getOriginThing(): NamedNode | BlankNode | undefined {
        return this._originThing;
    }

    public setOriginThing(thing: NamedNode | BlankNode): void {
        this._originThing = thing;
    }

}

export default DatasetCoreRdfjsImpl;