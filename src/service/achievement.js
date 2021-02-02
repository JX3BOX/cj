import {$http} from "./axios";
import {__helperUrl} from "@jx3box/jx3box-common/js/jx3box.json";

// 获取成就统计信息
function get_total_count() {
  return $http({
    method: "GET",
    url: `${__helperUrl}api/achievements/count`,
    headers: {Accept: "application/prs.helper.v2+json"},
  })
}

function get_achievements(params) {
  return $http({
    method: 'GET',
    url: `${__helperUrl}api/achievements`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: params,
  });
}

export {get_total_count, get_achievements};

