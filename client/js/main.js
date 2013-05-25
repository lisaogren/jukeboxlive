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


		"router": {

			"init": function(routes) {
				var self = this;

				self.Router = Backbone.Router.extend({ "routes": {} });

				self.register(routes);

				self.router = new self.Router();

				Backbone.history.start({ "pushState": true });
			},

			"register": function(routes) {
				var self = this,
					route;

				for (var i in routes) {
					route = routes[i];

					self.Router.prototype.routes[i] = route.tpl;

					self.Router.prototype[route.tpl] = function() {
						Session.set("current_page", route.tpl);
						Template[route.tpl].init.call(Template[route.tpl], _.extend(route.data, arguments));
					};

					if (!Template[route.tpl].current_page) {
						Template[route.tpl].current_page = function() {
							return Session.get('current_page') === route.tpl;
						};
					}
				}
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
	"concert/add": {
		"tpl": "concert_detail",
		"data": { "edit": true }
	},

	"concert/:id": {
		tpl: "concert_detail"
	},

	"concert/:id/edit": {
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
