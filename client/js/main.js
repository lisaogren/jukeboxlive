/**
 * -----------------------------------------------------------------------------
 *  INIT SESSION
 * -----------------------------------------------------------------------------
 */
Session.set("current_page", "concerts");
Session.set("current_band", null);
Session.set("current_concert", null);
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
				this.trigger('events:success');
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
						callback: fn,
						data: {}
					};
				}

				if (Template[data.tpl]) {
					if (!$.isFunction(data.callback) && $.isFunction(Template[data.tpl].init)) {
						data.callback = Template[data.tpl].init;
					}

					if (Template[data.tpl] && !Template[data.tpl].current_page) {
						Template[data.tpl].current_page = function() {
							return Session.get('current_page') === data.tpl;
						};
					}
				}

				self.page(route, function(ctx, inf) {
					log("[jb.router] Detected route " + route + ": " + data.tpl, log.DEBUG);

					// Store current page in session
					Session.set("current_page", data.tpl);
					
					// If a callback was given execute it
					if ($.isFunction(data.callback)) { data.callback(ctx, data.data); }
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
	"events:success": function() {
		log("[jb.events] Successfully loaded", log.DEBUG);
	}
});



/**
 * Initialize jb.router
 */
jb.router.init({
	"/": { tpl: "concert_list" },

	// band pages
	"/band/:name": {
		tpl: "band",
		callback: Template.band.init
	},

	"/concert/add": {
		"tpl": "concert_detail",
		"data": { "edit": true }
	},

	"/concert/:id": {
		tpl: "concert_detail"
	},

	"/concert/:id/edit": {
		tpl: "concert_detail",
		data: { "edit": true }
	}
});



/**
 * -----------------------------------------------------------------------------
 *  SUBSCRIPTIONS
 * -----------------------------------------------------------------------------
 */
Meteor.subscribe('venues');
Meteor.subscribe('bands');
Meteor.subscribe('concerts');
Meteor.subscribe('songs');




/**
 * -----------------------------------------------------------------------------
 *  CLIENT STARTUP
 * -----------------------------------------------------------------------------
 */
Meteor.startup(function() {
	log("[Meteor.startup] Meteor client started", log.DEBUG);
});
