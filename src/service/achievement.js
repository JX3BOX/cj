import { $helper } from "@jx3box/jx3box-common/js/https";

// 获取成就统计信息
function getAchievementsTotal() {
    return $helper().get(`api/achievements/count`);
}

function getMenus(general) {
    return $helper().get(`api/achievement/menus?general=${general}`);
}

// 获取菜单下成就
function getMenuAchievements(sub, detail = null) {
    let list_url = `api/achievements/${sub}`;
    if (detail) list_url = `${list_url}/${detail}`;
    return $helper().get(list_url);
}

// 获取成就列表
function getAchievements(params) {
    return $helper().get(`api/achievements`, {
        params,
    });
}

function searchAchievements(params) {
    return $helper().get(`api/achievement/search`, {
        params,
    });
}

function getRelationAchievements(source_id) {
    if (!source_id) return null;
    return $helper().get(`api/achievement/${source_id}/relations`);
}

function getNewestAchievements(page) {
    return $helper().get(`api/achievements/newest`, {
        params: {
            page,
        },
    });
}

function getAdventureAchievements(page) {
    return $helper().get(`api/achievements/adventure`, {
        params: {
            page,
        },
    });
}

function getWaitingAchievements(page) {
    return $helper().get(`api/achievements/waiting`, {
        params: {
            page,
        },
    });
}

function getRareAchievements(page) {
    return $helper().get(`api/achievements/rare`, {
        params: {
            page,
        },
    });
}

function getOutPrintAchievements(page) {
    return $helper().get(`api/achievements/out_print`, {
        params: {
            page,
        },
    });
}

// 贡献排行榜
function getAchievementRanking(sub) {
    return $helper().get(`api/achievement/users/ranking` + (sub ? `?sub=${sub}` : ""));
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
