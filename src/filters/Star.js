/**
 * Star
 * @param {*} level 综合难度
 */

const star = (level) => {
    return "⭐️".repeat(level ? level : 1);
}

export {
    star
}
