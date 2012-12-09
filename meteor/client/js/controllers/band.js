/**
 * -----------------------------------------------------------------------------
 * Band template helpers and actions
 * -----------------------------------------------------------------------------
 */



Template.band.init = function(ctx) {
	// Store the current selected band in session
	Session.set("currentBand", ctx.params.name);
};


Template.band.loggedIn = function() {
	return Meteor.userId() !== null;
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
			concerts[i].venue = Venues.findOne({ "_id": concerts[i].venueId });

			var date = new Date(concerts[i].date);

			concerts[i].formated_date = date.format("shortDateFr");
			concerts[i].formated_time = date.format("time");
			concerts[i].formated_datetime = date.format();

			concerts[i].songs = Songs.find({ "concertId": concerts[i]._id }, {
				sort: { "position": 1 }
			});
		}

		return concerts;
	}
};


Template.band.hasMyVote = function() {
	if (Meteor.userId() === null) return false;

	return !! _.filter(this.votes, function(vote) {
		return vote !== null && vote.user_id === Meteor.userId();
	}).length;
};

Template.band.voteCount = function() {
	// if (Meteor.userId() === null) return false;
	console.log("Counting other votes for ", this);

	return _.filter(this.votes, function(vote) {
		return vote !== null;
	}).length;
};



Template.band.events = {
	"click .songs-list li": function(evt, tpl) {
		if (Meteor.userId() === null) {
			console.log("[band.events] [click " + evt.currentTarget + "] Not logged in, motion denied");
			return false;
		}

		var song = Songs.findOne({ "_id": this._id });

		if (song) {
			var hasMyVote = !! _.filter(song.votes, function(vote) {
				if (vote === null) return false;
				return vote.user_id === Meteor.userId();
			}).length;

			if (hasMyVote) {
				console.log("[band.events] Trying to remove user vote");

				Songs.update({ "_id": this._id, "votes.user_id": Meteor.userId() }, {
					$unset: { "votes.$": 1 }
				});
			} else {
				console.log("[band.events] Trying to set user vote");
				Songs.update({ "_id": this._id }, {
					$push: {
						"votes": {
							"user_id": Meteor.userId(),
							"date": new Date()
						}
					}
				});
			}
		} else {
			console.log("[band.events] Could find song with id " + this._id);
		}
	}
};


// Template.band.created = function() {
// 	$(".songs-list").sortable({
// 		"placeholder": "ui-state-highlight"
// 	});
// };

// Template.band.rendered = function() {
// 	$(".songs-list").refresh();
// };