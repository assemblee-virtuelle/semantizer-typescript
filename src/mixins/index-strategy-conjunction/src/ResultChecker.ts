import { Semantizer } from "@semantizer/types";
import { Readable } from "stream";
import { Index, IndexEntry, IndexShape } from "@semantizer/mixin-index";
import { ResultChecker, ResultCheckerStrategy } from "./types";

export class ResultCheckerDefaultImpl extends Readable implements ResultChecker {

    private _semantizer: Semantizer;
    private _strategy: ResultCheckerStrategy;
    private _targetShape: IndexShape;
    private _entryStreams: Readable[];
    private _currentEntryStream: number;

    constructor(semantizer: Semantizer, targetShape: IndexShape, strategy: ResultCheckerStrategy) {
        super({ objectMode: true });
        this._semantizer = semantizer;
        this._targetShape = targetShape;
        this._strategy = strategy;
        this._entryStreams = [];
        this._currentEntryStream = 0;

        strategy.setChecker(this);
    }

    public getSemantizer(): Semantizer {
        return this._semantizer;
    }

    public getTargetShape(): IndexShape {
        return this._targetShape;
    }

    public async addIndex(index: Index): Promise<void> {
        const entryStream = await index.loadEntryStream();
        await this._addEntryStream(entryStream);
    }

    private async _addEntryStream(inputStream: Readable): Promise<void> {
        this._entryStreams.push(inputStream);
        inputStream.on('data', (entry: IndexEntry) => this._pushNextEntry(entry));
    }

    private _pushNextEntry(entry: IndexEntry): void {
        if (this._strategy.check(entry))
            this.push(entry);
    }

    pause(): this {
        super.pause();
        for (const stream of this._entryStreams)
            stream.pause();
        return this;
    }

    resume(): this {
        super.resume();
        for (const stream of this._entryStreams)
            stream.resume();
        return this;
    }

    // Consumed data
    async _read(size: number): Promise<void> {
        return;
    }

}

export abstract class ResultCheckerStrategyBase implements ResultCheckerStrategy {

    private _checker: ResultChecker | undefined;

    public setChecker(checker: ResultChecker): void {
        this._checker = checker;
    }

    public getChecker(): ResultChecker {
        if (!this._checker)
            throw new Error("No checker has been assigned to the strategy.");
        return this._checker;
    }

    abstract check(entry: IndexEntry): boolean;
}