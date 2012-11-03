/**
 * -----------------------------------------------------------------------------
 * Home template helpers and actions
 * -----------------------------------------------------------------------------
 */


/**
 * Check if home is the current page
 * @return {boolean}
 */
Template.home.currentPage = function() {
	return Session.get('currentPage') === "home";
};



Template.home.songs = function() {
	var concertId = "eb02c6c9-92a6-4626-82b5-e72ed467ad62";

	return Songs.find({ "concert_id": concertId });
}