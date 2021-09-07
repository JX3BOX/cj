import axios from "axios";
import { jx3ClientType } from "@jx3box/jx3box-common/js/utils";

function $http(disClient = false) {
    const headers = { Accept: "application/prs.helper.v2+json" };
    if (disClient) {
        headers["JX3-Client-Type"] = jx3ClientType();
    }
    return axios.create({
        withCredentials: true,
        headers: headers,
    });
}

export { $http, axios };
