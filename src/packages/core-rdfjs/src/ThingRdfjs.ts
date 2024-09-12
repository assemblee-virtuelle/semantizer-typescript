import { Dataset, Thing, ThingConstructor } from "@semantizer/types";

export function ThingMixin<
    TBase extends ThingConstructor
>(Base: TBase) {

    return class ThingMixinImpl extends Base implements Thing {
        
        getDataset(): Dataset {
            throw new Error("Method not implemented.");
        }
        getDocument(): Document {
            throw new Error("Method not implemented.");
        }

    }

}