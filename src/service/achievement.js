import { $helper } from "@jx3box/jx3box-common/js/https";

const client = location.href.includes("origin") ? "origin" : "std";

// 获取成就统计信息
export function getAchievementsTotal() {
    return $helper().get(`/api/achievements/count`, {
        params: {
            client,
        },
    });
}

// 侧边栏分组
export function getMenus(general) {
    return $helper().get(`/api/achievement/menus`, {
        params: {
            general,
            client,
        },
    });
}

// 获取菜单下成就
export function getMenuAchievements(sub, detail) {
    let url = `/api/achievements/${sub}`
    if (detail) url += `/${detail}`
    return $helper().get(url, {
        params: {
            client,
        },
    });
}

// 获取成就列表
export function getAchievements(params) {
    return $helper().get(`/api/achievements`, {
        params: Object.assign(params, { client }),
    });
}

export function searchAchievements(params) {
    return $helper().get(`/api/achievement/search`, {
        params: Object.assign(params, { client }),
    });
}

export function getRelationAchievements(source_id) {
    return $helper().get(`/api/achievement/${source_id}/relations`, {
        params: {
            client,
        },
    });
}

export function getNewestAchievements(page) {
    return $helper().get(`/api/achievements/newest`, {
        params: {
            page,
            client,
        },
    });
}

export function getAdventureAchievements(page) {
    return $helper().get(`/api/achievements/adventure`, {
        params: {
            page,
            client,
        },
    });
}

export function getWaitingAchievements(page) {
    return $helper().get(`/api/achievements/waiting`, {
        params: {
            page,
            client,
        },
    });
}

export function getWaitingRate() {
    const params = {
        type: 'achievement',
        client
    };
    return $helper().get(`/api/wiki/posts/counter`, { params });
}

export function getRareAchievements(page) {
    return $helper().get(`/api/achievements/rare`, {
        params: {
            page,
            client,
        },
    });
}

export function getOutPrintAchievements(page) {
    return $helper().get(`/api/achievements/out_print`, {
        params: {
            page,
            client,
        },
    });
}

// 贡献排行榜
export function getAchievementRanking(sub) {
    return $helper().get(`/api/achievement/users/ranking` + (sub ? `?sub=${sub}` : ""));
}

// 获取角色的成就状态
export function getRoleAchievements(role_id) {
    return $helper().get(`/api/achievement/roles/${role_id}`, {
        params: {
            client,
        },
    });
}

// 批量更新角色的成就状态
export function updateRoleAchievements(role_id, list) {
    return $helper().post(`api/achievement/roles/${role_id}/done`, {
        list,
    }, {
        params: {
            client,
        },
    });
}