/**
 * -----------------------------------------------------------------------------
 * Concert detail helpers and actions
 * -----------------------------------------------------------------------------
 */


Template.concert.init = function(ctx) {
	// Store the current selected band in session
	Session.set("concert_id", ctx.params.id);
	Session.set("concert_edit", false);
};


Template.concert.edit = function() {
	return Session.get("concert_edit");
};


Template.concert.concert = function() {
	var concert = Concerts.findOne({ "_id": Session.get("concert_id") });

	if (concert !== undefined) {
		// Retrieve the band of the concert
		concert.band = Bands.findOne({ "_id": concert.bandId });

		// Retrieve the venue of the concert
		concert.venue = Venues.findOne({ "_id": concert.venueId });

		// Retrieve the date
		var date = new Date(concert.date);

		// Format the date
		concert.formated_date = date.format("shortDateFr");
		concert.formated_time = date.format("time");
		concert.formated_datetime = date.format();

		// Retrieve the songs of the concert
		concert.songs = Songs.find({ "concertId": concert._id }, {
			sort: { "position": 1 }
		});
	}

	return concert;
};


/**
 * Check if a song has the current user's vote
 * @return {Boolean} True if the current user voted for this song else false
 */
Template.concert.hasMyVote = function() {
	if (Meteor.userId() === null) return false;

	return !! _.filter(this.votes, function(vote) {
		return vote !== null && vote.user_id === Meteor.userId();
	}).length;
};


/**
 * Counts the total number of votes for a song
 * @return {Number} The number of votes
 */
Template.concert.voteCount = function() {
	if (Meteor.userId() === null) return false;

	return _.filter(this.votes, function(vote) {
		return vote !== null;
	}).length;
};


/**
 * Concert template user events
 * @type {Object}
 */
Template.concert.events = {

	/**
	 * User votes/unvotes for a song in the list
	 * @param  {Event} evt The user event object
	 * @param  {Template} tpl Meteor template object
	 */
	"click .songs-list li": function(evt, tpl) {
		if (Meteor.userId() === null) {
			log("[band.events] Not logged in, cannot vote on songs", log.DEBUG);
			return false;
		}

		var song = Songs.findOne({ "_id": this._id });

		if (song) {
			var hasMyVote = !! _.filter(song.votes, function(vote) {
				if (vote === null) return false;
				return vote.user_id === Meteor.userId();
			}).length;

			if (hasMyVote) {
				log("[band.events] Removing user vote for song: " + this.name, log.DEBUG);

				Songs.update({ "_id": this._id, "votes.user_id": Meteor.userId() }, {
					$unset: { "votes.$": 1 }
				});
			} else {
				log("[band.events] Adding user vote for song: " + this.name, log.DEBUG);

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
			log("[band.events] Could find song with id " + this._id, log.DEBUG);
		}
	}
};
