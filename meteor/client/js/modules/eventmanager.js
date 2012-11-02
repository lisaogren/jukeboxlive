(function() {
/**
 * EventManager permits to distribute events between modules using Backbone
 * @param {object} options Object containing methods to bind events on init
 */
var EventManager = window.EventManager = function(options) {
	return new EventManager.fn.init(options);
};


// EventManager prototype
EventManager.fn = EventManager.prototype = {

	// constructor
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
};

// extend prototype to init function
EventManager.fn.init.prototype = EventManager.fn;


})();