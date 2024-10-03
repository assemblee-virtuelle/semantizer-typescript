import { NamedNode } from "@semantizer/types";
import { Readable } from "stream";
import { FinalIndexResult, Index, IndexEntry, IndexShape, IndexStrategyFinalIndexes } from "./types";

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

export class IndexStrategyFinalIndexesDefaultImpl implements IndexStrategyFinalIndexes {
    
    public execute(rootIndex: Index, shape: IndexShape, maxFind?: number): Readable {
        let foundFinalIndexCount: number = 0;
        const promises: Promise<void>[] = [];

        const resultStream = new Readable({ objectMode: true });
        resultStream._read = () => {};

        const processSubIndex = async (entry: IndexEntry, entryStream: Readable) => {
            const subIndex = entry.getSubIndex();
            if (subIndex) {
                try {
                    entryStream.pause();
                    const subIndexPromise = process(subIndex);
                    promises.push(subIndexPromise);
                    await subIndexPromise;
                    entryStream.resume();
                }
                catch(e) { console.error("Error while loading " + subIndex.getOrigin()?.value + e) }
            } else { console.error("No subIndexFound for potencial result source.") }
        }

        const process = async (index: Index) => {
            return new Promise<void>(async (resolve, reject) => {
                if (maxFind && foundFinalIndexCount < maxFind - 1) {
                    const entryStream = await index.loadEntryStream();

                    entryStream.on('data', async (entry: IndexEntry) => {
                        if (maxFind && foundFinalIndexCount >= maxFind) {
                            entryStream.pause(); // if the stream is not paused, the call to destroy() would have no effect
                            entryStream.destroy(); // handled by the 'close' event (see below)
                            return; // when we have enough results, we should stop the streaming process.
                        }
                        
                        // TODO: maybe the comparison can be checked directly into the Transform stream (loadEntryStream method)?
                        const comparisonResult = entry.compareShape(shape);

                        if (comparisonResult.getResult() === 1) {
                            const subIndex = entry.getSubIndex();
                            if (subIndex) {
                                const result = new FinalIndexResultImpl(subIndex, comparisonResult.getComparedPath());
                                resultStream.push(result)
                                foundFinalIndexCount++;
                            }
                        }

                        else if (comparisonResult.getResult() === 0 && entry.hasSubIndex()) {
                            if (maxFind && foundFinalIndexCount < maxFind - 1) {
                                await processSubIndex(entry, entryStream);
                            }
                        }
                    });

                    entryStream.on('end', () => resolve());

                    promises.push(new Promise<void>((resolveThis, rejectThis) => {
                        entryStream.on('end', async () => resolveThis());
                        entryStream.on('error', (error) => rejectThis(error));
                    }));
                }

                else resolve();
            });
        }

        process(rootIndex).then(() => {
            Promise.all(promises).then(() => resultStream.push(null));
        });

        return resultStream;
    }
    
}