import { $helper } from "@jx3box/jx3box-common/js/https";

const client = location.href.includes("origin") ? "origin" : "std";

// 获取成就统计信息
function getAchievementsTotal() {
    return $helper().get(`/api/achievements/count`, {
        params: {
            client,
        },
    });
}

// 侧边栏分组
function getMenus(general) {
    return $helper().get(`/api/achievement/menus`, {
        params: {
            general,
            client,
        },
    });
}

// 获取菜单下成就
function getMenuAchievements(sub, detail) {
    let url = `/api/achievements/${sub}`
    if(detail) url += `/${detail}`
    return $helper().get(url, {
        params: {
            client,
        },
    });
}

// 获取成就列表
function getAchievements(params) {
    return $helper().get(`/api/achievements`, {
        params: Object.assign(params, { client }),
    });
}

function searchAchievements(params) {
    return $helper().get(`/api/achievement/search`, {
        params: Object.assign(params, { client }),
    });
}

function getRelationAchievements(source_id) {
    return $helper().get(`/api/achievement/${source_id}/relations`, {
        params: {
            client,
        },
    });
}

function getNewestAchievements(page) {
    return $helper().get(`/api/achievements/newest`, {
        params: {
            page,
            client,
        },
    });
}

function getAdventureAchievements(page) {
    return $helper().get(`/api/achievements/adventure`, {
        params: {
            page,
            client,
        },
    });
}

function getWaitingAchievements(page) {
    return $helper().get(`/api/achievements/waiting`, {
        params: {
            page,
            client,
        },
    });
}

function getRareAchievements(page) {
    return $helper().get(`/api/achievements/rare`, {
        params: {
            page,
            client,
        },
    });
}

function getOutPrintAchievements(page) {
    return $helper().get(`/api/achievements/out_print`, {
        params: {
            page,
            client,
        },
    });
}

// 贡献排行榜
function getAchievementRanking(sub) {
    return $helper().get(`/api/achievement/users/ranking` + (sub ? `?sub=${sub}` : ""));
}

// 获取角色的成就状态
function getRoleAchievements(role_id) {
    return $helper().get(`/api/achievement/roles/${role_id}`, {
        params: {
            client,
        },
    });
}

// 批量更新角色的成就状态
function updateRoleAchievements(role_id, list) {
    return $helper().post(`api/achievement/roles/${role_id}/done`, {
        list,
    },{
        params: {
            client,
        },
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
    getRoleAchievements,
    updateRoleAchievements,
};
