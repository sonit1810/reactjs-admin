import { getAuthorizeData } from "../helpers/Ultis";
import SuperFetchBase from "./SuperFetchBase";

class SuperFetch extends SuperFetchBase {
    constructor() {
        super(getAuthorizeData());
    }
}

export default SuperFetch;
