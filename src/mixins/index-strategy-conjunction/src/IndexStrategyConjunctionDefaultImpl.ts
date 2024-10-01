import { DatasetSemantizer, Semantizer } from "@semantizer/types";
import { ResultCheckerDefaultImpl } from "./ResultChecker.js";
import { FinalIndexResult, Index, IndexEntry, IndexShape, IndexStrategy, IndexStrategyFinalIndexesDefaultImpl } from "@semantizer/mixin-index";
import { ResultCheckerStrategy } from "./types.js";
import { ResultCheckerStrategyMultiple } from "./ResultCheckerStrategyMultiple.js";
import { ResultCheckerStrategySingle } from "./ResultCheckerStrategySingle.js";

export class IndexStrategyConjunctionDefaultImpl implements IndexStrategy {

    private _semantizer: Semantizer;

    public constructor(semantizer: Semantizer) {
        this._semantizer = semantizer;
    }

    public async execute(rootIndex: Index, shape: IndexShape, callbackfn: (target: DatasetSemantizer) => void, limit?: number): Promise<void> {
        let resultCount = 0;
        const limitCount: number = limit? limit: 30;
        const strategy: ResultCheckerStrategy = shape.hasMultiCriteria() ? new ResultCheckerStrategyMultiple() : new ResultCheckerStrategySingle();
        const finalIndexesStrategy = new IndexStrategyFinalIndexesDefaultImpl();
        const finalIndexStream = finalIndexesStrategy.execute(rootIndex, shape, limit);
        const resultChecker = new ResultCheckerDefaultImpl(this._semantizer, shape, strategy);

        resultChecker.on('data', (entry: IndexEntry) => {
            if (resultCount >= limitCount) {
                resultChecker.pause();
                resultCount = 0;
            } else {
                const target = entry.getTarget();
                if (target) {
                    callbackfn(target);
                    resultCount++;
                }
            }
        });

        finalIndexStream.on('data', (result: FinalIndexResult) => resultChecker.addIndex(result.getIndex()));
        finalIndexStream.on('error', (error) => console.warn(error));

        return new Promise<void>((resolve, reject) => {
            resultChecker.on('end', () => { resolve() });
            resultChecker.on('error', (error) => reject(error));
        })

    }

}