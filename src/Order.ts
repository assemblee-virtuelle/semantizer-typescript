export default class Order {

    public async getOrderedBy(): Promise<Agent> {
        // make a new command
        // pass it to the queue
        // wait for the result
        return await super.getSemanticProperty<Agent>("orderedBy");
    }

    public getTotalPrice(): number {
        // compute the logic here
        return 42;
    }

}