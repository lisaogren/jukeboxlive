/**
 * -----------------------------------------------------------------------------
 * Band template helpers and actions
 * -----------------------------------------------------------------------------
 */


/**
 * Initialize a band page. Given as a callback to page.js.
 * Recieves a context object from page.js with a name param
 * to find the corresponding band.
 * Stores the value in the "currentBand" session field
 * 
 * @param  {Context} ctx The page.js context object
 */
Template.band.init = function(ctx) {
	// Store the current selected band in session
	Session.set("currentBand", ctx.params.name);
};


/**
 * Retrieve de band from the database
 * @return {Band} The band object
 */
Template.band.band = function() {
	return Bands.findOne({ "name": Session.get("currentBand") });
};


/**
 * Retrieve band concerts and songs
 * @return {Concerts} A list of concerts
 */
Template.band.concerts = function() {
	// Find the band
	var band = Bands.findOne({ "name": Session.get("currentBand") });

	if (band) {
		// Retrieve the band's list of concerts
		var concerts = Concerts.find({ "bandId": band._id }).fetch();

		// loop through the concerts
		for (var i in concerts) {
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
	}
};


/**
 * Check if a song has the current user's vote
 * @return {Boolean} True if the current user voted for this song else false
 */
Template.band.hasMyVote = function() {
	if (Meteor.userId() === null) return false;

	return !! _.filter(this.votes, function(vote) {
		return vote !== null && vote.user_id === Meteor.userId();
	}).length;
};


/**
 * Counts the total number of votes for a song
 * @return {Number} The number of votes
 */
Template.band.voteCount = function() {
	if (Meteor.userId() === null) return false;

	return _.filter(this.votes, function(vote) {
		return vote !== null;
	}).length;
};



/**
 * Band template user events
 * @type {Object}
 */
Template.band.events = {

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
