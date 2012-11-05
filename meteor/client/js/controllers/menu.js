/**
 * -----------------------------------------------------------------------------
 * Menu template helpers and actions
 * -----------------------------------------------------------------------------
 */

$(function() {
	$("#menu").menu();
});

Template.menu.created = function() {
	// console.log("Created menu template");
};


Template.menu.rendered = function() {
	// console.log("Rendered menu template");

	$("#menu").menu("refresh");
};


/**
 * List all the available bands
 * @return {Collection}
 */
Template.menu.bands = function() {
	return Bands.find();
};