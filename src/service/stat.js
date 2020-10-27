import { $next,axios } from "./axios";

function getStat(id) {
    return $next
        .get("api/summary-any/" + "cj-" + id + "/stat")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function postStat(id) {
    return $next.get("api/summary-any/" + "cj-" + id, {
        params: {
            type: "cj",
            actions: "views",
        },
    });
}
function getRank() {
    return $next.get("api/summary/visit/rank", {
        params: {
            postType: "cj",
            postAction: "views",
            sort: "7days",
            pageSize: 15,
        },
    }).catch((err) => {
        console.log(err)
    })
}

export { getStat, postStat, getRank };
