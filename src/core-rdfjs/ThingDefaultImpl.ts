import { ThingDefaultImpl as ThingDefaultImplCore, ThingType } from "../core-default/ThingDefaultImpl";
import Document from "../core/Document";
import ThingStateRdfjsRegular from "./ThingStateRdfjsRegular";
import ThingStateRdfjsAnonymous from "./ThingStateRdfjsAnonymous";
import ThingState from "./ThingState";
import Thing from "../core/Thing";
import { RdfjsDatasetSerializable } from "./RdfjsDatasetSerializable";
import DatasetCore from "@rdfjs/dataset/DatasetCore";

export class ThingDefaultImpl extends ThingDefaultImplCore implements Thing, RdfjsDatasetSerializable {

    private _state: ThingState;

    public constructor(document: Document, stateType: ThingType, uriOrNameHint?: string) {
        super(document, stateType, uriOrNameHint);

        switch (stateType) {
            case ThingType.Regular:
                if (!uriOrNameHint)
                    throw new Error();
                this._state = new ThingStateRdfjsRegular(this, uriOrNameHint);
                break;
        
            case ThingType.Anonymous:
                if (uriOrNameHint?.startsWith('http'))
                    throw new Error("You are trying to create an anonymous thing with an URI but anonymous thing can not have an URI. Please pass a name hint instead or leave it undefined.");
                this._state = new ThingStateRdfjsAnonymous(this, uriOrNameHint);
                break;

            case ThingType.ForDescribing:
                this._state = new ThingStateRdfjsRegular(this, document.getUri());
                break;
        }
    }

    protected getState(): ThingState {
        return this._state;
    }

    public equals(other: Thing): boolean {
        return this.getState().equals(other);
    }

    public getUri(): string {
        return this.getState().getUri();
    }

    public toRdfjsDataset(): DatasetCore {
        return this.getState().toRdfDatasetExt();
    }

}

export default ThingDefaultImpl;