/**
 * -----------------------------------------------------------------------------
 * Calendar template helpers and actions
 * -----------------------------------------------------------------------------
 */


/**
 * Check if calendar is the current page
 * @return {boolean}
 */
Template.calendar.currentPage = function() {
	return Session.get('currentPage') === "calendar";
};