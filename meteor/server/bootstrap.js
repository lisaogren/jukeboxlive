/**
 * Start the meteor server
 *
 * @author Carl Ogren
 */
Meteor.startup(function() {

	// Bands.remove({});
	// Venues.remove({});
	// Concerts.remove({});
	// Songs.remove({});

	// Test data for the application
	if (Bands.find().count() === 0) {
		// Bands
		var bands_list = [
			{ "name": "GMH", "description": "Melodic Punk Metal", "origin": "France" }
			// { "name": "Rock'Ave", "description": "Rock'n'Roll Blues", "origin": "France" },
			// { "name": "Roux Libres", "description": "Chanson française", "origin": "France" }
		];

		var venues_list = [
			{ "name": "Vane Day Bar", "address": "30 avenue Pasteur", "zip": "93100", "city": "Montreuil" }
		];

		// Loop through each venue
		for (var i in venues_list) {
			// Insert venue
			Venues.insert(venues_list[i]);
		}

		// Loop through each bands
		for (var i in bands_list) {
			// Insert band
			var band_id = Bands.insert(bands_list[i]),
				venue_id = Venues.findOne({ "name": "Vane Day Bar" })._id;

			// Create a concert for the band
			var concert_id = Concerts.insert({
				"label": "Concert " + bands_list[i].name,
				"date": new Date(),
				"venue_id": venue_id,
				"band_id": band_id
			});

			for (var j = 0; j < 10; j++) {
				Songs.insert({
					"name": "Song #" + (j + 1),
					"concert_id": concert_id,
					"position": (j + 1),
					"votes": []
				});
			}
		}
	}
});