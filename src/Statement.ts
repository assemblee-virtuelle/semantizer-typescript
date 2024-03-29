import Thing from "./Thing";

export interface Statement {
    getThing(): Thing;
    getSubject(): string;
    getValue(): string;
    getDatatype(): string;
    getLanguage(): string;
}

export default Statement;