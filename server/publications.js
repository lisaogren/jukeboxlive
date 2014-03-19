/**
 * Events publications
 */
Meteor.publish("events", function() {
	return Events.find({}, {
		sort: {
			when: 1
		}
	});
});

Meteor.publish("singleEvent", function(id) {
	return id && Events.find(id);
});




/**
 * Venues publications
 */
Meteor.publish("venues", function() {
	return Venues.find({}, {
		sort: {
			name: 1
		}
	});
});

Meteor.publish("eventVenue", function(eventId) {
	var event = Events.findOne(eventId);

	if (event) {
		return Venues.find(event.where);
	} else {
		return false;
	}
});




/**
 * Songs publications
 */
Meteor.publish("songs", function() {
	return Songs.find();
});

Meteor.publish("bandSongs", function(bandId) {
	if (bandId) {
		return Songs.find({
			owner: bandId
		}, {
			sort: {
				title: 1
			}
		});
	}
});




/**
 * Bands publications
 */
Meteor.publish("myBands", function() {
	return this.userId && Bands.find({
		owner: this.userId
	});
});

Meteor.publish("bands", function() {
	return Bands.find({}, {
		sort: {
			name: 1
		}
	});
});

Meteor.publish("singleBand", function(id) {
	return id && Bands.find(id);
});