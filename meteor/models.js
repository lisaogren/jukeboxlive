/**
 * -----------------------------------------------------------------------------
 *  Meteor Models / Loaded on both server and client-side
 * -----------------------------------------------------------------------------
 */


/**
 * Initialize venues collection
 */
Venues = new Meteor.Collection("venues");




/**
 * Initialize bands collection
 * @type {Meteor.Collection}
 */
Bands = new Meteor.Collection("bands");




/**
 * Initialize concerts collection
 * @type {Meteor.Collection}
 */
Concerts = new Meteor.Collection("concerts");





/**
 * Initialize songs collection
 * @type {Meteor.Collection}
 */
Songs = new Meteor.Collection("songs");


/**
 * Determine authorized actions on songs collection
 */
Songs.allow({
	// Deny all insertions
	insert: function() {
		return false;
	},
	// authorize logged in users to modify votes field
	update: function(userId, songs, fields, modifier) {
		return Meteor.userId() && fields.length === 1 && fields[0] === "votes";
	},
	// deny all deletions
	remove: function() {
		return false;
	}
});



/**
 * Meteor secure methods
 */
Meteor.methods({
	/**
	 * Vote for a song
	 * @param  {string} song_id  The minimongo id of the song
	 */
	"vote": function(song_id) {
		Songs.update({ "_id": song_id }, {
			$push: {
				"votes": {
					"user_id": Meteor.userId(),
					"date": new Date()
				}
			}
		});
	},

	/**
	 * Unvote for a song
	 * @param  {string} song_id  The minimongo id of the song
	 */
	"unvote": function(song_id) {
		Songs.update({ "_id": song_id, "votes.user_id": Meteor.userId() }, {
			$unset: { "votes.$": 1 }
		});
	}
});