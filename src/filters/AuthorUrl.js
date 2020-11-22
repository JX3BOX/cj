/**
 * 获取用户主页链接
 * @param {*} icon_id IconID
 */

const {__Root} = require("@jx3box/jx3box-common/js/jx3box.json");

export default (user_id) => {
  return user_id ? `${__Root}author/?uid=${user_id}` : null;
}