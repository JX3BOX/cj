import axios from "axios";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";

const stat = __next + "api/summary-any/";
// const stat = "/api/summary-any/";
function getStat(id) {
    return axios
        .get(stat + 'cj-' + id + "/stat")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

const actions = __next + "api/summary-any/";
// const actions = "/api/summary-any/";
function postStat(id) {
    return axios.get(actions + 'cj-' + id, {
        params: {
            type: "cj",
            actions: "views",
        },
    });
}
const rank = __next + 'api/summary/visit/rank'
// const rank = "/api/summary/visit/rank";
function getRank() {
    return axios.get(rank,{
        params : {
            postType : 'cj',
            postAction : 'views',
            sort : '7days',
            pageSize : 15
        }
    });
}

export { getStat, postStat, getRank };

