import { ResultCheckerStrategyBase } from "./ResultChecker.js";
import { IndexEntry } from "@semantizer/mixin-index";

export class ResultCheckerStrategySingle extends ResultCheckerStrategyBase {

    public check(entry: IndexEntry): boolean {
        return entry.compareShape(this.getChecker().getTargetShape()).getResult() === 1;
    }

}