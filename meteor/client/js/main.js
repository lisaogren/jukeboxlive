/**
 * -----------------------------------------------------------------------------
 *  INIT SESSION
 * -----------------------------------------------------------------------------
 */
Session.set("currentPage", "home");
// Session.set('login_error', "");


/**
 * -----------------------------------------------------------------------------
 * Initialize the event manager
 * -----------------------------------------------------------------------------
 */
events = EventManager({
	success: function() {
		console.log("[EventManager] Successfully loaded EventManager");
	}
});



/**
 * -----------------------------------------------------------------------------
 *  ROUTING
 * -----------------------------------------------------------------------------
 */
router = Router({
	"/": { tpl: "home" },
	"/vote": { tpl: "vote" },
	"/calendar": { tpl: "calendar" },
	"/about": { tpl: "about" },

	// band pages
	"/band/:name": {
		tpl: "band",
		callback: BandTemplateInit
	}
});



/**
 * -----------------------------------------------------------------------------
 *  SUBSCRIPTIONS
 * -----------------------------------------------------------------------------
 */
Meteor.subscribe('bands');
Meteor.subscribe('concerts');
Meteor.subscribe('songs');




/**
 * -----------------------------------------------------------------------------
 *  CLIENT STARTUP
 * -----------------------------------------------------------------------------
 */
Meteor.startup(function() {
	console.log("[Meteor.startup] Meteor client started");
});
