/**
 * -----------------------------------------------------------------------------
 * Concert detail template helpers and actions
 * -----------------------------------------------------------------------------
 */


/**
 * Initialize a concert_detail page. Given as a callback to page.js.
 * Recieves a context object from page.js with a name param
 * to find the corresponding band.
 * Stores the value in the "current_concert" session field
 * 
 * @param  {Context} ctx The page.js context object
 */
Template.concert_detail.init = function(ctx) {
	console.log("Current page is now concert_detail");
	// Store the current selected band in session
	Session.set("current_concert", ctx.params.id);
};




/**
 * Check if a song has the current user's vote
 * @return {Boolean} True if the current user voted for this song else false
 */
Template.concert_detail.has_my_vote = function() {
	if (Meteor.userId() === null) return false;

	return !! _.filter(this.votes, function(vote) {
		return vote !== null && vote.user_id === Meteor.userId();
	}).length;
};


/**
 * Counts the total number of votes for a song
 * @return {Number} The number of votes
 */
Template.concert_detail.vote_count = function() {
	if (Meteor.userId() === null) return false;

	return _.filter(this.votes, function(vote) {
		return vote !== null;
	}).length;
};




Template.concert_detail.concert = function() {
	// Find the band
	var concert = Concerts.findOne({ "_id": Session.get("current_concert") });

	if (concert) {
		concert.ok = true;

		// Retrieve the concert's band
		concert.band = Bands.findOne({ "_id": concert.band_id });

		if (!concert.band) {
			return {
				"ok": false,
				"err": "Could not find band with id: " + concert.band_id
			};
		}

		// Retrieve the concert venue
		concert.venue = Venues.findOne({ "_id": concert.venue_id });

		if (!concert.venue) {
			return {
				"ok": false,
				"err": "Could not find band with id: " + concert.venue_id
			};
		}

		// Retrieve the date
		var date = new Date(concert.date);

		// Format the date
		concert.formated_date = date.format("shortDateFr");
		concert.formated_time = date.format("time");
		concert.formated_datetime = date.format();

		// Retrieve the songs of the concert
		concert.songs = Songs.find({ "concert_id": concert._id }, {
			sort: { "position": 1 }
		}).fetch();

		return concert;
	} else {
		return {
			"ok": false,
			"err": "Could not find any concerts with id: " + Session.get("current_concert")
		};
	}
};


/**
 * Band template user events
 * @type {Object}
 */
Template.concert_detail.events = {

	/**
	 * User votes/unvotes for a song in the list
	 * @param  {Event} evt The user event object
	 * @param  {Template} tpl Meteor template object
	 */
	"click .songs-list li": function(evt, tpl) {
		if (Meteor.userId() === null) {
			log("[concert_detail.events] Not logged in, cannot vote on songs", log.DEBUG);
			return false;
		}

		var song = Songs.findOne({ "_id": this._id });

		if (song) {
			var hasMyVote = !! _.filter(song.votes, function(vote) {
				if (vote === null) return false;
				return vote.user_id === Meteor.userId();
			}).length;

			if (hasMyVote) {
				log("[concert_detail.events] Removing user vote for song: " + this.name, log.DEBUG);

				Meteor.call("unvote", this._id);
			} else {
				log("[concert_detail.events] Adding user vote for song: " + this.name, log.DEBUG);

				Meteor.call("vote", this._id);
			}
		} else {
			log("[concert_detail.events] Could find song with id " + this._id, log.DEBUG);
		}
	}
};

