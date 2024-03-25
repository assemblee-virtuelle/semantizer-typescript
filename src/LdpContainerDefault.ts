import LdpContainer from "./LdpContainer";
import DocumentDefaultImpl from "./DocumentDefaultImpl";

export default class LdpContainerDefault extends DocumentDefaultImpl implements LdpContainer {

    // Todo: add methods to get meta info.

    // Returns the number of resources in the container
    public countContainedResources(): number {
        return 0;
    }

}