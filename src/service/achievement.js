import { $helper } from "@jx3box/jx3box-common/js/https";

// 获取成就统计信息
function getAchievementsTotal() {
    return $helper()({
        method: "GET",
        url: `api/achievements/count`,
    });
}

function getMenus(general) {
    return $helper()({
        method: "GET",
        url: `api/achievement/menus?general=${general}`,
    });
}

// 获取菜单下成就
function getMenuAchievements(sub, detail = null) {
    let list_url = `api/achievements/${sub}`;
    if (detail) list_url = `${list_url}/${detail}`;
    return $helper()({
        method: "GET",
        url: list_url,
    });
}

// 获取成就列表
function getAchievements(params) {
    return $helper()({
        method: "GET",
        url: `api/achievements`,
        params: params,
    });
}

function searchAchievements(params) {
    return $helper()({
        method: "GET",
        url: `api/achievement/search`,
        params: params,
    });
}

function getRelationAchievements(source_id) {
    if (!source_id) return null;
    return $helper()({
        method: "GET",
        url: `api/achievement/${source_id}/relations`,
    });
}

function getNewestAchievements(page) {
    return $helper()({
        method: "GET",
        url: `api/achievements/newest`,

        params: { page: page },
    });
}

function getAdventureAchievements(page) {
    return $helper()({
        method: "GET",
        url: `api/achievements/adventure`,

        params: { page: page },
    });
}

function getWaitingAchievements(page) {
    return $helper()({
        method: "GET",
        url: `api/achievements/waiting`,

        params: { page: page },
    });
}

function getRareAchievements(page) {
    return $helper()({
        method: "GET",
        url: `api/achievements/rare`,

        params: { page: page },
    });
}

function getOutPrintAchievements(page) {
    return $helper()({
        method: "GET",
        url: `api/achievements/out_print`,

        params: { page: page },
    });
}

// 贡献排行榜
function getAchievementRanking(sub) {
    return $helper()({
        method: "GET",
        url: `api/achievement/users/ranking` + (sub ? `?sub=${sub}` : ""),
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
