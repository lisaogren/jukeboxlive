/**
 * -----------------------------------------------------------------------------
 * Band template helpers and actions
 * -----------------------------------------------------------------------------
 */



Template.band.init = function(ctx) {
	// Store the current selected band in session
	Session.set("currentBand", ctx.params.name);
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

	var votes = _.filter(this.votes, function(vote) {
		return vote.user_id === Meteor.userId();
	});

	return !!votes.length;
};



Template.band.events = {
	"click .songs-list li": function(evt, tpl) {
		if (Meteor.userId() === null) return false;

		// $(tpl.find(".checkbox")).addClass("selected");

		Songs.update({
				_id: this._id
			}, {
				$push: {
					"votes": {
						"user_id": Meteor.userId(),
						"date": new Date().getTime()
					}
				}
			});

		console.log(Songs.findOne({ _id: this._id }));
	}
};


Template.band.created = function() {
	$(".songs-list").sortable({
		"placeholder": "ui-state-highlight"
	});
};

Template.band.rendered = function() {
	$(".songs-list").refresh();
};