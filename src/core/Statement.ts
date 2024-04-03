import ThingBase from "./Thing";

export interface Statement {
    getThing(): ThingBase;
    getSubject(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}

export default Statement;