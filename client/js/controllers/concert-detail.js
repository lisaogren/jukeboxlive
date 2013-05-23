/**
 * -----------------------------------------------------------------------------
 * Concert detail template helpers and actions
 * -----------------------------------------------------------------------------
 */


/**
 * Initialize a concert_detail page. Given as a callback to page.js.
 * Recieves a context object from page.js with a name param
 * to find the corresponding band.
 * Stores the value in the "concert_id" session field
 * 
 * @param  {Context} ctx The page.js context object
 */
Template.concert_detail.init = function(ctx, data) {
	if (typeof ctx.params.id !== "undefined") {
		// Store the current selected concert in session
		Session.set("concert_id", ctx.params.id);
	} else {
		Session.set("concert_id", null);
	}

	// Initialize data
	data = data || {};

	// Extend default params
	data = _.extend({
		"edit": false
	}, data);

	// Store template mode
	Session.set("concert_edit", data.edit);
};



/**
 * Executes after the concert_detail template is rendered
 */
Template.concert_detail.rendered = function() {
	console.log("Template concert_detail rendered \\o/");

	if (Session.get("concert_edit")) {
		$("#concert-date").datetimepicker({
			"stepMinute": 15
		});
	}
};



/**
 * Check if a song has the current user's vote
 * @return {Boolean} True if the current user voted for this song else false
 */
Template.concert_detail.has_my_vote = function() {
	if (Meteor.userId() === null) { return false };

	return !! _.filter(this.votes, function(vote) {
		return vote !== null && vote.user_id === Meteor.userId();
	}).length;
};



/**
 * Counts the total number of votes for a song
 * @return {Number} The number of votes
 */
Template.concert_detail.vote_count = function() {
	if (Meteor.userId() === null) { return false };

	return _.filter(this.votes, function(vote) {
		return vote !== null;
	}).length;
};



/**
 * Is the template in "edit" mode
 * @return {Boolean} True if edit mode is on else false
 */
Template.concert_detail.edit = function() {
	if (Meteor.userId() === null) { return false };

	return Session.get("concert_edit");
};


/**
 * Is the template in "add" mode
 * @return {Boolean} True if add mode is on else false
 */
Template.concert_detail.add = function() {
	if (Meteor.userId() === null) { return false };

	return Session.get("concert_add");
};



/**
 * Retrieve the selected concert
 * It binds the related band, venue and songs, it also formats the date
 * 
 * @return {Concert} MongoDB object representing a concert
 */
Template.concert_detail.concert = function() {
	var concert_id = Session.get("concert_id");

	console.log("Concert id : ", concert_id);

	if (concert_id === null) {
		return { "ok": true };
	} else {
		// Find the band
		var concert = Concerts.findOne({ "_id": concert_id });

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
			concert.formated_date = date.format("shortDateEn");
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
				"err": "Could not find any concerts with id: " + Session.get("concert_id")
			};
		}
	}
};



/**
 * Concert detail template user events
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

		// Retrieve song
		var song = Songs.findOne({ "_id": this._id });

		if (song) {
			// Check if user has already voted for this song
			if (tpl.has_my_vote()) {
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

