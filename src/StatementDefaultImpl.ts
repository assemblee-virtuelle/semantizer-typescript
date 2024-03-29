import Statement from "./Statement";
import Thing from "./Thing";

export class StatementDefaultImpl<T> implements Statement<T> {

    private _thing: Thing;
    private _subject: string;
    private _value: T;

    public constructor(thing: Thing, subject: string, value: T) {
        this._thing = thing;
        this._subject = subject;
        this._value = value;
    }

    public getThing(): Thing {
        return this._thing;
    }

    public getSubject(): string {
        return this._subject;
    }

    public getValue(): T {
        return this._value;
    }

}

export default StatementDefaultImpl;