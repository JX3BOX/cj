import { $http } from "./axios";
import { __helperUrl } from "@jx3box/jx3box-common/data/jx3box.json";

// 获取成就统计信息
function getAchievementsTotal() {
    return $http(true)({
        method: "GET",
        url: `${__helperUrl}api/achievements/count`,
    });
}

function getMenus(general) {
    return $http(true)({
        method: "GET",
        url: `${__helperUrl}api/achievement/menus?general=${general}`,
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

// 获取菜单下成就
function getMenuAchievements(sub, detail = null) {
    let list_url = `${__helperUrl}api/achievements/${sub}`;
    if (detail) list_url = `${list_url}/${detail}`;
    return $http(true)({
        method: "GET",
        url: list_url,
    });
}

// 获取成就列表
function getAchievements(params) {
    return $http(true)({
        method: "GET",
        url: `${__helperUrl}api/achievements`,

        params: params,
    });
}

function searchAchievements(params) {
    return $http(true)({
        method: "GET",
        url: `${__helperUrl}api/achievement/search`,

        params: params,
    });
}

function getRelationAchievements(source_id) {
    if (!source_id) return null;
    return $http(true)({
        method: "GET",
        url: `${__helperUrl}api/achievement/${source_id}/relations`,
    });
}

function getNewestAchievements(page) {
    return $http(true)({
        method: "GET",
        url: `${__helperUrl}api/achievements/newest`,

        params: { page: page },
    });
}

function getAdventureAchievements(page) {
    return $http(true)({
        method: "GET",
        url: `${__helperUrl}api/achievements/adventure`,

        params: { page: page },
    });
}

function getWaitingAchievements(page) {
    return $http(true)({
        method: "GET",
        url: `${__helperUrl}api/achievements/waiting`,

        params: { page: page },
    });
}

function getRareAchievements(page) {
    return $http(true)({
        method: "GET",
        url: `${__helperUrl}api/achievements/rare`,

        params: { page: page },
    });
}

function getOutPrintAchievements(page) {
    return $http(true)({
        method: "GET",
        url: `${__helperUrl}api/achievements/out_print`,

        params: { page: page },
    });
}

// 贡献排行榜
function getAchievementRanking(sub) {
    return $http(false)({
        method: "GET",
        url: `${__helperUrl}api/achievement/users/ranking` + (sub ? `?sub=${sub}` : ""),
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
