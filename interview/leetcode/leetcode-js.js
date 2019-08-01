// https://leetcode-cn.com/problems/jewels-and-stones/

/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
const numJewelsInStones = function(J, S) {
    return S.split('').filter(s => J.includes(s)).length
};