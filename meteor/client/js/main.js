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
Session.set("currentPage", "home");
// Session.set('login_error', "");


/**
 * -----------------------------------------------------------------------------
 *  ROUTING
 * -----------------------------------------------------------------------------
 */
router = Router({
	"/": "home",
	"/calendar": "calendar",
	"/about": "about",
	"/contact": "contact"
});



Template.home.currentPage = function() {
	return Session.get('currentPage') === "home";
};

Template.calendar.currentPage = function() {
	return Session.get('currentPage') === "calendar";
};



/**
 * -----------------------------------------------------------------------------
 *  CLIENT STARTUP
 * -----------------------------------------------------------------------------
 */
Meteor.startup(function() {
	console.log("[Meteor.startup] Meteor client started");

	$("#menu").menu();
});
