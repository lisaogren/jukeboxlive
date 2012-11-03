/**
 * -----------------------------------------------------------------------------
 * Vote template helpers and actions
 * -----------------------------------------------------------------------------
 */


/**
 * Check if home is the current page
 * @return {boolean}
 */
Template.vote.currentPage = function() {
	return Session.get('currentPage') === "vote";
};