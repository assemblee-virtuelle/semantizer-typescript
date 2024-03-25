import DatasetExt from "rdf-ext/lib/Dataset";
import Resource from "./Resource";
import Thing from "./Thing";
import ThingState from "./ThingState";

export default class ThingStateAnonymous implements ThingState {

    public constructor(thing: Thing, nameHint?: string) {

    }
    toRdfDatasetExt(): DatasetExt {
        throw new Error("Method not implemented.");
    }
    getThing(): Thing {
        throw new Error("Method not implemented.");
    }

    getAllValuesAboutStatement(property: string): string[] {
        throw new Error("Method not implemented.");
    }

    addStatement(about: string, value: string | Resource, datatype?: string | undefined, language?: string | undefined): Thing {
        throw new Error("Method not implemented.");
    }
    
    public getUri(): string {
        return '';
    }

    public isAnonymous(): boolean {
        return true;
    }

}