import { $team } from "@jx3box/jx3box-common/js/https";

// 获取用户角色
const getUserRoles = () => {
    return $team().get(`api/team/my-game-roles?nopage`)
}

export {
    getUserRoles
}
