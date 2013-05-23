(function(window, $) {
/**
 * JukeBox Live main app controller
 */

// init marionette application
JBL = new Backbone.Marionette.Application();


// add regions
JBL.addRegions({
	"content": "#content"
});


// init history when routing has started
JBL.vent.on("routing:started", function() {
	if (!Backbone.History.started) {
		Backbone.history.start();
	}
});


// Start marionette app
$(function() {
	log("[main] Starting JukeBox Live application");
	JBL.start();
});


})(window, jQuery);