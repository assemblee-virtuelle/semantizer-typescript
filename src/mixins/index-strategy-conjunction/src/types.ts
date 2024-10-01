import { Semantizer } from "@semantizer/types";
import { Index, IndexEntry, IndexShape } from "@semantizer/mixin-index";

export interface ResultChecker {
    getSemantizer(): Semantizer;
    getTargetShape(): IndexShape;
    addIndex(index: Index): Promise<void>;
    pause(): this;
    resume(): this;
}
export interface ResultCheckerStrategy {
    getChecker(): ResultChecker;
    setChecker(checker: ResultChecker): void;
    check(entry: IndexEntry): boolean;
}