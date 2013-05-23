/**
 * -----------------------------------------------------------------------------
 * Concert list helpers and actions
 * -----------------------------------------------------------------------------
 */


Template.concert_list.concerts = function() {
	// Retrieve the list of concerts
	var concerts = Concerts.find().fetch();

	// loop through the concerts
	for (var i in concerts) {
		// Retrieve the band of the concert
		concerts[i].band = Bands.findOne({ "_id": concerts[i].band_id });

		// Retrieve the venue of the concert
		concerts[i].venue = Venues.findOne({ "_id": concerts[i].venue_id });

		// Retrieve the date
		var date = new Date(concerts[i].date);

		// Format the date
		concerts[i].formated_date = date.format("shortDateFr");
		concerts[i].formated_time = date.format("time");
		concerts[i].formated_datetime = date.format();

		// Mark the concert "past" if the date actually is in the past
		var now = new Date().getTime();
		if (date.getTime() < now) {
			concerts[i].past = true;
		} else {
			concerts[i].past = false;
		}

		// Retrieve the songs of the concert
		// concerts[i].songs = Songs.find({ "concert_id": concerts[i]._id }, {
		// 	sort: { "position": 1 }
		// });
	}

	return concerts;
};





Template.concert_list.events = {

	"click #add-event": function() {
		alert("test");
	}

};