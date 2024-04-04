import { ThingDefaultImpl as ThingDefaultImplCore, ThingType } from "../core-default/ThingDefaultImpl";
import ThingStateRdfjsRegular from "./ThingStateRdfjsRegular";
import ThingStateRdfjsAnonymous from "./ThingStateRdfjsAnonymous";
export class ThingDefaultImpl extends ThingDefaultImplCore {
    constructor(document, stateType, uriOrNameHint) {
        super(document, stateType, uriOrNameHint);
        switch (stateType) {
            case ThingType.Regular:
                if (!uriOrNameHint)
                    throw new Error();
                this._state = new ThingStateRdfjsRegular(this, uriOrNameHint);
                break;
            case ThingType.Anonymous:
                if (uriOrNameHint === null || uriOrNameHint === void 0 ? void 0 : uriOrNameHint.startsWith('http'))
                    throw new Error("You are trying to create an anonymous thing with an URI but anonymous thing can not have an URI. Please pass a name hint instead or leave it undefined.");
                this._state = new ThingStateRdfjsAnonymous(this, uriOrNameHint);
                break;
            case ThingType.ForDescribing:
                this._state = new ThingStateRdfjsRegular(this, document.getUri());
                break;
        }
    }
    getState() {
        return this._state;
    }
    equals(other) {
        return this.getState().equals(other);
    }
    getUri() {
        return this.getState().getUri();
    }
    toRdfjsDataset() {
        return this.getState().toRdfDatasetExt();
    }
}
export default ThingDefaultImpl;
//# sourceMappingURL=ThingDefaultImpl.js.map