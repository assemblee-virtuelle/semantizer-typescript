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
        const streamsCount = shape.countProperties() - 1;
        const promises: Promise<void>[] = [];
        const processedStreams: Readable[] = [];

        const resultStream = new Readable({ objectMode: true });
        resultStream._read = () => {};

        const processSubIndex = async (entry: IndexEntry, entryStream: Readable) => {
            const subIndex = entry.getSubIndex();
            if (subIndex) {
                try {
                    entryStream.pause();
                    await process(subIndex);
                    entryStream.resume();
                }
                catch(e) { console.error("Error while loading " + subIndex.getOrigin()?.value + e) }
            } else { console.error("No subIndexFound for potencial result source.") }
        }

        const process = async (index: Index) => {
            return new Promise<void>(async (resolve, reject) => {
                if (maxFind && foundFinalIndexCount < maxFind - 1) {
                    const entryStream = await index.loadEntryStream();
                    processedStreams.push(entryStream);

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

                    entryStream.on('error', (error) => reject(error));
                    entryStream.on('end', async () => {
                        await Promise.all(promises);
                        resolve();
                        return;
                    });
                }

                else resolve();
            });
        }

        process(rootIndex);

        return resultStream;
    }
    
}