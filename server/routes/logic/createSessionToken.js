/**
 * Creates random token.
 * We should check this token in all user's requests.
 * @returns {number}
 */
module.exports = function () {
	return 1 + Math.random()*100000>>0;
};