// Initialize events collection
Events = new Meteor.Collection("events");


/**
 * Define allow rules on events
 */
Events.allow({
	// Allow updates on the user's own events
	update: Permissions.isOwner,

	// Allow deletions on the user's own events
	remove: Permissions.isOwner
});


/**
 * Define deny rules on events
 */
Events.deny({
	// Verify that no injections were made on the update data
	update: function(userId, event, fields) {
		return (_.without(fields, "title", "who", "when", "where", "songs").length > 0);
	}
});


/**
 * Events server secure methods
 */
Meteor.methods({

	/**
	 * Add an event
	 *
	 * @param  {object} attrs The attributes to compose the event
	 * @return {string}       The event id
	 */
	"event:add": function(attrs) {
		var user = Meteor.user();

		if (!user) {
			throw new Meteor.Error(401, "You need to login to add a band");
		}

		// @todo Separate each field control to customize error messages
		if (!attrs.title || !attrs.who || !attrs.when || !attrs.where || !attrs.songs) {
			throw new Meteor.Error(422, "Please fill the form completely before submitting it");
		}

		var event = _.extend(_.pick(attrs, "title", "who", "when", "where", "songs"), {
			owner: user._id,
			createdAt: new Date().getTime()
		});

		return Events.insert(event);
	}

});