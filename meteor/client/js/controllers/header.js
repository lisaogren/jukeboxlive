/**
 * -----------------------------------------------------------------------------
 * Header template helpers and actions
 * -----------------------------------------------------------------------------
 */


/**
 * Retrieves the client/server connection status
 * @return {string} "connected" or "disconnected"
 */
Template.header.connected = function() {
	return Meteor.status().connected;
};