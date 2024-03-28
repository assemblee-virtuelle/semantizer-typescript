import LdpContainer from "./LdpContainer";
import DocumentAbstractDefaultImpl from "./DocumentDefaultImpl";

export default class LdpContainerDefault extends DocumentAbstractDefaultImpl implements LdpContainer {

    // Todo: add methods to get meta info.

    // Returns the number of resources in the container
    public countContainedResources(): number {
        return 0;
    }

}