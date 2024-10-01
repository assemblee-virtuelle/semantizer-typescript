import { NamedNode } from "@semantizer/types";
import { ResultCheckerStrategyBase } from "./ResultChecker.js";
import { IndexEntry, IndexShape, indexShapeFactory } from "@semantizer/mixin-index";
import { ResultChecker } from "./types.js";

export class ResultCheckerStrategyMultiple extends ResultCheckerStrategyBase {

    private _targetShapes: IndexShape[];
    private _propertyPathCount: number;
    private _results: string[];
    private _resultScore: {[key:string]: number};

    public constructor() {
        super();
        this._targetShapes = [];
        this._propertyPathCount = 0;
        this._results = [];
        this._resultScore = {};
    }

    override setChecker(checker: ResultChecker): void {
        super.setChecker(checker);
        this._targetShapes = this._getTargetShapes();
        this._propertyPathCount = this.getChecker().getTargetShape().getFilterProperties().length;
    }

    private _getTargetShapes(): IndexShape[] {
        const targetShape = this.getChecker().getTargetShape();
        const typeProperty = targetShape.getRdfTypeProperty();

        return targetShape.getFilterProperties().map(property => {
            const shape = this.getChecker().getSemantizer().build(indexShapeFactory);
            shape.addTargetRdfType(typeProperty.getValue()! as NamedNode);

            if (property.isValueProperty()) {
                shape.addValueProperty(property.getPath()!, property.getValue()!);
            }
            else if (property.isPatternProperty()) {
                shape.addPatternProperty(property.getPath()!, property.getValue()!);
            }
            else throw new Error("The property is neither a value property nor a pattern property");

            return shape;
        })
    }

    public check(entry: IndexEntry): boolean {
        let result = false;
        const targetDataset = entry.getTarget();
        const target = targetDataset?.getOrigin()?.value;

        if (target) {
            for (const shape of this._targetShapes) {
                if (!this._results.includes(target)) {
                    if (!this._resultScore[target]) {
                        this._resultScore[target] = 1;
                        break;
                    }
                    else if(this._resultScore[target] === this._propertyPathCount - 1) {
                        result = true;
                        delete this._resultScore[target];
                        this._results.push(target);
                        break;
                    } else {
                        this._resultScore[target] = this._resultScore[target] + 1;
                        break;
                    }
                }
            }
        }

        return result;
    }

}