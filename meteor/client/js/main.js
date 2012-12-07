/**
 * -----------------------------------------------------------------------------
 *  INIT SESSION
 * -----------------------------------------------------------------------------
 */
Session.set("currentPage", "band");
Session.set("currentBand", "GMH");
// Session.set('login_error', "");




/**
 * -----------------------------------------------------------------------------
 * JukeBox live main controller
 * It has an event manager (Backbone) and a router (page.js)
 * -----------------------------------------------------------------------------
 */
window.jb = (function() {

	var jb = {

		events: {
			init: function(options) {
				// extend backbone functionalities
				_.extend(this, Backbone.Events);

				// Bind events given on startup
				for (var i in options) {
					this.on(i, options[i], this);
				}

				// trigger a success event
				this.trigger('eventmanager:success');
			}
		},

		router: {
			routes: null,

			// constructor
			init: function(routes) {
				// Store routes to bind
				this.routes = routes;
				this.page = window.page;

				this.register();

				this.page();
			},


			/**
			 * Register routes given at initialization to page.js
			 */
			register: function() {
				var self = this;

				for (var i in self.routes) {
					self.route(i, self.routes[i]);
				}

				self.route("*", self.notfound);
			},


			/**
			 * Declare a route to page.js
			 * @param  {string} route The route to map
			 * @param  {object} data  An object containing the template name and optionnaly an initialization callback
			 *                        Example: {tpl: "home", callback: InitHomePage}
			 */
			route: function(route, data) {
				if ($.isFunction(data)) {
					var fn = data;

					data = {
						tpl: null,
						callback: fn
					};
				}

				if (Template[data.tpl] && !Template[data.tpl].currentPage) {
					Template[data.tpl].currentPage = function() {
						return Session.get('currentPage') === data.tpl;
					};
				}

				self.page(route, function(ctx, inf) {
					console.log("[Router] Detected route " + route + ": " + data.tpl);

					// Store current page in session
					Session.set("currentPage", data.tpl);
					
					// If a callback was given execute it
					if ($.isFunction(data.callback))
						data.callback(ctx);
				});
			},


			/**
			 * Navigate to a specific route
			 * @param  {string} url The route to be triggered
			 */
			go: function(url) {
				this.page.show(url);
			},


			/**
			 * Executed when a non existing route is called
			 * @param  {Context} ctx Page.js context object
			 */
			notfound: function(ctx) {
				console.log("Could not find the page you are looking for");
			}
		}
	};

	return jb;

})();




/**
 * Initialize jb.events
 */
jb.events.init({
	success: function() {
		console.log("[EventManager] Successfully loaded EventManager");
	}
});



/**
 * Initialize jb.router
 */
jb.router.init({
	"/": { tpl: "band" },

	// band pages
	"/band/:name": {
		tpl: "band",
		callback: Template.band.init
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
