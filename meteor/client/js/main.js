/**
 * Initialize the event manager
 * @type {EventManager}
 */
events = EventManager({
	success: function() {
		console.log("[EventManager] Successfully loaded EventManager");
	}
});


/**
 * -----------------------------------------------------------------------------
 *  INIT SESSION
 * -----------------------------------------------------------------------------
 */
// Session.set('nick', null);
// Session.set('login_error', "");


/**
 * -----------------------------------------------------------------------------
 *  ROUTING
 * -----------------------------------------------------------------------------
 */

page("/", function() {
	console.log("index page w00t");
});
page();


/**
 * -----------------------------------------------------------------------------
 *  CLIENT STARTUP
 * -----------------------------------------------------------------------------
 */
Meteor.startup(function() {
	console.log("[Meteor.startup] Meteor client started");

	$("#menu").menu();
});
