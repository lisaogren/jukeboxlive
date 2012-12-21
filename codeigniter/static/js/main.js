(function(window, $) {
/**
 * JukeBox Live main app controller
 */

// init marionette application
JL = new Backbone.Marionette.Application();


// add regions
JL.addRegions({
	"content": "#content"
});


// init history when routing has started
JL.vent.on("routing:started", function() {
	if (!Backbone.History.started) {
		Backbone.history.start();
	}
});


// Start marionette app
$(function() {
	log("[main] Starting JukeBox Live application");
	JL.start();
});


})(window, jQuery);