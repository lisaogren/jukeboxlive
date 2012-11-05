/**
 * -----------------------------------------------------------------------------
 * Header template helpers and actions
 * -----------------------------------------------------------------------------
 */

Template.header.connected = function() {
	return Meteor.status().connected;
};