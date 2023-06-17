import Subscriber from "./Subscriber";

export default interface Publisher {

    subscribe(subscriber: Subscriber): void;
    unsubscribe(subscriber: Subscriber): void;
    notifySubscribers(): void;

}