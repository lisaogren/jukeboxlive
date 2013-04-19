/**
 * -----------------------------------------------------------------------------
 * Concert list helpers and actions
 * -----------------------------------------------------------------------------
 */


Template.concerts.concerts = function() {
	// Retrieve the band's list of concerts
	// var concerts = Concerts.find({ "bandId": band._id }).fetch();
	var concerts = Concerts.find().fetch();

	// loop through the concerts
	for (var i in concerts) {
		// Retrieve the band of the concert
		concerts[i].band = Bands.findOne({ "_id": concerts[i].bandId });

		// Retrieve the venue of the concert
		concerts[i].venue = Venues.findOne({ "_id": concerts[i].venueId });

		// Retrieve the date
		var date = new Date(concerts[i].date);

		// Format the date
		concerts[i].formated_date = date.format("shortDateFr");
		concerts[i].formated_time = date.format("time");
		concerts[i].formated_datetime = date.format();

		// Retrieve the songs of the concert
		concerts[i].songs = Songs.find({ "concertId": concerts[i]._id }, {
			sort: { "position": 1 }
		});
	}

	return concerts;
};





Template.concerts.events = {

	"click #add-event": function() {
		alert("test");
	}

};