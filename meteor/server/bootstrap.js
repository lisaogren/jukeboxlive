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
});