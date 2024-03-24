import ThingState from "./ThingState";

export default class ThingStateAnonymous implements ThingState {
    
    public getUri(): string {
        return '';
    }

    public isAnonymous(): boolean {
        return true;
    }

}