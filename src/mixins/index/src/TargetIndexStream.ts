import { Duplex } from "stream";
import { FinalIndexResult, Index, IndexEntry, IndexShape } from "./types";
import { NamedNode } from "@semantizer/types";

class FinalIndexResultImpl implements FinalIndexResult {
    
    private _index: Index;
    private _path: NamedNode;

    public constructor(index: Index, path: NamedNode) {
        this._index = index;
        this._path = path;
    }

    public getIndex(): Index {
        return this._index;
    }

    public getPath(): NamedNode<string> {
        return this._path;
    }

}

export class TargetIndexStream extends Duplex {

    private _shape: IndexShape;
    private _maxFind?: number;
    private _indexCount: number;

    public constructor(shape: IndexShape, maxFind?: number) {
        super({ objectMode: true });
        this._shape = shape;
        this._maxFind = maxFind;
        this._indexCount = 0;
    }

    private async _processEntry(entry: IndexEntry): Promise<void> {
        const comparisonResult = entry.compareShape(this._shape);
        
        if (comparisonResult.getResult() === 1) {
            const subIndex = entry.getSubIndex();
            if (subIndex) {
                const result = new FinalIndexResultImpl(subIndex, comparisonResult.getComparedPath());
                this.push(result);
                this._indexCount = this._indexCount + 1;
            }
        }

        else if (comparisonResult.getResult() === 0 && entry.hasSubIndex()) {
            if (!this._maxFind || (this._maxFind && this._indexCount < this._maxFind - 1)) {
                const subIndex = entry.getSubIndex();
                if (subIndex) {
                    const subIndexEntryStream = await subIndex.loadEntryStream();
                    subIndexEntryStream.on('data', async (entry: IndexEntry) => await this._processEntry(entry));
                    await new Promise<void>((resolve, reject) => {
                        subIndexEntryStream.on('end', () => resolve());
                        subIndexEntryStream.on('error', (error) => reject(error));
                    })
                }
            }
        }
    }

    _read(size: number): void {
        return;
    }

    async _write(entry: IndexEntry, encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): Promise<void> {
        await this._processEntry(entry);
        callback();
    }

}