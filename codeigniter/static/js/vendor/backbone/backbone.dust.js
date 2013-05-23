(function() {


/**
 * Use dust.js to render templates instead of underscore
 */
Backbone.Marionette.Renderer = _.extend(Backbone.Marionette.Renderer, {
	/**
	 * Overrides the marionette render method
	 * @param  {string} template Dust.js template name
	 * @param  {object} data     The data object passed to the template
	 * @return {string}          The generated html 
	 */
	render: function(template, data) {
		var html = "";

		dust.render(template, data, function(err, out) {
			if (err) {
				console.error(err);
			} else {
				html = out;
			}
		});

		return html;
	}
});


})();