import Thing from "./Thing";

export interface Statement {
    getThing(): Thing;
    getSubject(): string;
    getValue(): string;
    getDatatype(): string | undefined;
    getLanguage(): string | undefined;
}

export default Statement;