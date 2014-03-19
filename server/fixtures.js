if (Venues.find().count() === 0) {
	// Create bands
	/*var gmhId = Bands.insert({
		name: "G.M.H"
	});

	var rouxId = Bands.insert({
		name: "Les Roux Libres"
	});*/

	// Create venues
	var miroitId = Venues.insert({
		name: "La Miroiterie",
		address: "88 rue de Ménilmontant, 75020 Paris"
	});

	var sportId = Venues.insert({
		name: "Le Café des Sports",
		address: "94 rue de Ménilmontant, 75020 Paris"
	});

	var campagnardId = Venues.insert({
		name: "Le Petit Campagnard",
		address: "320 rue des Pyrénées, 75020 Paris"
	});

	// Create events
	/*var date = moment();

	Events.insert({
		title: "G.M.H en concert à la Miroit' \\o/",
		when: date.valueOf(),
		where: miroitId,
		who: gmhId
	});

	Events.insert({
		title: "Les Roux au Petit Campagnard",
		when: date.add("days", 10).valueOf(),
		where: campagnardId,
		who: rouxId
	});

	Events.insert({
		title: "Les Roux au Café des Sports",
		when: date.add("days", 10).valueOf(),
		where: sportId,
		who: rouxId
	});*/
}