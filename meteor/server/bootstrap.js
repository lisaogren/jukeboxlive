/**
 * Start the meteor server
 *
 * @author Carl Ogren
 */
Meteor.startup(function() {

	/**
	* Quelques données à afficher
	* si BDD vide. (prévisionnel).
	**/
 	// if (Lists.find().count() === 0) {
	    var data = [
			{name: "Bands in top 10",
				contents: [
					["GMH", "France", "Melodic Punk Metal"],
					["Arch Enemy", "Swede", "Deth Metal Melodic"],
					["SoilWork", "Swede", "Deth Metal Melodic"],
					["Propagandhi", "Canada", "Punk"],
					["NoFx", "US", "Punk Rock"],
					["Disarmonia Mundi", "Italy", "Deth Metal Melodic"],
					["Bad Relegion", "US", "Punk Rock"],
					["Iron Maiden", "England", "Heavy Metal"],
					["L'esprit du clan", "France", "Hardcore Metal"],
					["Ten Foot Pole", "US", "Punk Rock"]
				]
			}
	    ];
	// }
	


	if (Bands.find().count() === 0) {
		// Bands
		var bandsList = [
			{ "name": "GMH", "description": "Melodic Punk Metal", "origin": "France" },
			{ "name": "Rock'Ave", "description": "Rock'n'Roll Blues", "origin": "France" }
		];

		for (var i in bandsList) {
			var bandId = Bands.insert(bandsList[i]);

			var concertId = Concerts.insert({
				"label": "Concert de " + bandsList[i].name,
				"bandId": bandId
			});

			for (var j = 0; j < 10; j++) {
				Songs.insert({
					"name": "Song #" + j,
					"concertId": concertId
				});
			}
		}
	}
});