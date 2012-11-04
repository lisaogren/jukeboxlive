/**
 * -----------------------------------------------------------------------------
 * Content template helpers and actions
 * -----------------------------------------------------------------------------
 */



/**
 * List all the available bands
 * @return {Collection}
 */
Template.content.bands = function() {
	return Bands.find();
};