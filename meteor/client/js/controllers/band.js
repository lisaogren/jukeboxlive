/**
 * -----------------------------------------------------------------------------
 * Band template helpers and actions
 * -----------------------------------------------------------------------------
 */

function BandTemplateInit(ctx) {
	// Store the current selected band in session
	Session.set("currentBand", ctx.params.name);
};


/**
 * Check if band is the current page
 * @return {boolean}
 */
Template.band.currentPage = function() {
	return Session.get('currentPage') === "band";
};



Template.band.band = function() {
	var band = Bands.findOne({ "name": Session.get("currentBand") });
	return band;
};



Template.band.concerts = function() {
	var band = Bands.findOne({ "name": Session.get("currentBand") });

	if (band) {
		var concerts = Concerts.find({ "bandId": band._id }).fetch();

		for (var i in concerts) {
			concerts[i].songs = Songs.find({ "concertId": concerts[i]._id });
		}

		return concerts;
	}
};