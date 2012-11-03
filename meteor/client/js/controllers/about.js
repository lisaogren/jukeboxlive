/**
 * -----------------------------------------------------------------------------
 * About template helpers and actions
 * -----------------------------------------------------------------------------
 */


/**
 * Check if home is the current page
 * @return {boolean}
 */
Template.about.currentPage = function() {
	return Session.get('currentPage') === "about";
};