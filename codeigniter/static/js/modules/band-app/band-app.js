(function() {
/**
 * Band App controller
 */
JBL.BandApp = (function() {
	// create empty object for public methods
	var BandApp = {};


	// create a layout
	var Layout = Backbone.Marionette.Layout.extend({
		// dust template
		"template": "band-app-layout",

		// regions in the layout
		"regions": {
			"description": "#description",
			"songs": "#songs"
		}
	});


	



	// return public methods
	return BandApp;

})();



})();