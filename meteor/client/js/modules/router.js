(function(window) {
/**
 * Meteor Router
 * -------------
 * Based on the page.js client-side router
 *
 * This router takes a list of key/values to bind urls 
 * 
 * @param {object} options Extend the default options
 */
var Router = window.Router = function(routes) {
	return new Router.fn.init(routes);
};

// Router prototype
Router.prototype = Router.fn = {

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
	 * Register routes to page.js
	 */
	register: function() {
		var self = this;

		for (var i in self.routes) {
			(function() {

				var route = i,
					tpl = self.routes[i];

				self.page(route, function() {
					console.log("[Router] Detected route " + route + ": " + tpl);

					// Store current page in session
					Session.set("currentPage", tpl);
					// Store data that might have been passed along the page
					Session.set("pageOptions", arguments);
				});

			})();
		}
	},

	go: function(url) {
		this.page.show(url);
	}
};

Router.fn.init.prototype = Router.fn;



})(window);