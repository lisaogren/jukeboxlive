// Init event manager
var events = EventManager({
	success: function() {
		console.log("[EventManager] Successfully loaded EventManager");
	}
});


/**
 * ************************
 *    COLLECTION MANAGERS
 * ************************
 */




/**
 * ***************
 *  INIT SESSION
 * ***************
 */
// Session.set('nick', null);
// Session.set('login_error', "");



/**
 * ****************
 *  CLIENT STARTUP
 * ****************
 */
Meteor.startup(function() {
	console.log("[Meteor.startup] Meteor client started");
});
