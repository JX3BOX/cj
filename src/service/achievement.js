import {$http} from "./axios";
import {__helperUrl} from "@jx3box/jx3box-common/js/jx3box.json";

const API = __helperUrl + "api";
const qs = require("qs");

function get_achievements(params) {
    return $http.get(`${API}/achievements`, {
        headers: {Accept: "application/prs.helper.v2+json"},
        params: params,
    });
}

export {get_achievements};

