import LdpContainer from "./LdpContainer";
import DocumentDefault from "./DocumentDefault";

export default class LdpContainerDefault extends DocumentDefault implements LdpContainer {

    // Todo: add methods to get meta info.

    // Returns the number of resources in the container
    public countContainedResources(): number {
        return 0;
    }

}