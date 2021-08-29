import {$http} from "./axios";
import {__helperUrl} from "@jx3box/jx3box-common/data/jx3box.json";

// 获取成就统计信息
function getAchievementsTotal() {
  return $http({
    method: "GET",
    url: `${__helperUrl}api/achievements/count`,
    headers: {Accept: "application/prs.helper.v2+json"},
  });
}

function getMenus(general) {
  return $http({
    method: "GET",
    url: `${__helperUrl}api/achievement/menus?general=${general}`,
    headers: { Accept: "application/prs.helper.v2+json" },
  })
}

// 获取菜单下成就
function getMenuAchievements(sub, detail = null) {
  let list_url = `${__helperUrl}api/achievements/${sub}`;
  if (detail) list_url = `${list_url}/${detail}`;
  return $http({
    method: "GET",
    url: list_url,
    headers: {Accept: "application/prs.helper.v2+json"},
  });
}

// 获取成就列表
function getAchievements(params) {
  return $http({
    method: "GET",
    url: `${__helperUrl}api/achievements`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: params,
  });
}

function searchAchievements(params) {
  return $http({
    method: "GET",
    url: `${__helperUrl}api/achievement/search`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: params,
  })
}

function getRelationAchievements(source_id) {
  if (!source_id) return null;
  return $http({
    method: "GET",
    url: `${__helperUrl}api/achievement/${source_id}/relations`,
    headers: {Accept: "application/prs.helper.v2+json"},
  });
}

function getNewestAchievements(page) {
  return $http({
    method: "GET",
    url: `${__helperUrl}api/achievements/newest`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: {page: page},
  });
}

function getAdventureAchievements(page) {
  return $http({
    method: "GET",
    url: `${__helperUrl}api/achievements/adventure`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: {page: page},
  });
}

function getWaitingAchievements(page) {
  return $http({
    method: "GET",
    url: `${__helperUrl}api/achievements/waiting`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: {page: page},
  });
}

function getRareAchievements(page) {
  return $http({
    method: "GET",
    url: `${__helperUrl}api/achievements/rare`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: {page: page},
  });
}

function getOutPrintAchievements(page) {
  return $http({
    method: "GET",
    url: `${__helperUrl}api/achievements/out_print`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: {page: page},
  });
}

function getAchievementRanking(sub) {
  return $http({
    method: "GET",
    url: `${__helperUrl}api/achievement/users/ranking` + (sub ? `?sub=${sub}` : ""),
    headers: {Accept: "application/prs.helper.v2+json"},
  });
}

export {
  getAchievementsTotal,
  getMenus,
  getMenuAchievements,
  getAchievements,
  searchAchievements,
  getRelationAchievements,
  getNewestAchievements,
  getAdventureAchievements,
  getWaitingAchievements,
  getRareAchievements,
  getOutPrintAchievements,
  getAchievementRanking,
};
