import { DatasetSemantizer, Semantizer } from "@semantizer/types";
import { Index, IndexShape, IndexStrategy } from "./types";

export abstract class IndexStrategyBaseImpl implements IndexStrategy {

    private _semantizer: Semantizer | undefined;

    public setSemantizer(semantizer: Semantizer): void {
        this._semantizer = semantizer;
    }

    public getSemantizer(): Semantizer {
        if (!this._semantizer)
            throw new Error("Strategy is not attached to a Semantizer instance.")
        return this._semantizer;
    }
    
    public abstract execute(index: Index, callbackfn: (target: DatasetSemantizer) => void, limit?: number | undefined): Promise<void>;

}