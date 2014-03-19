Songs = new Meteor.Collection("songs");


Songs.allow({
	remove: Permissions.ownsSong,
	update: Permissions.ownsSong
});

Songs.deny({
	update: function(userId, song, fields) {
		return (_.without(fields, "title", "owner").length > 0);
	}
});


Meteor.methods({
	"song:add": function(attrs) {
		// @todo replace owner by band id
		var user = Meteor.user(),
			band = Bands.findOne(attrs.owner),
			existingSong = Songs.findOne({
				owner: attrs.owner,
				title: attrs.title
			});

		console.log(band);
		console.log(attrs.owner);

		if (!user) {
			throw new Meteor.Error(401, "You need to login to add a song");
		}

		if (!band) {
			throw new Meteor.Error(401, "The band does not exist");
		}

		if (!attrs.title) {
			throw new Meteor.Error(422, "The song needs a title");
		}

		if (band.owner !== user._id) {
			throw new Meteor.Error(403, "You are not authorized to add songs to " + band.name + "'s song list");
		}

		if (attrs.title && existingSong) {
			throw new Meteor.Error(406, "The song already exists", existingSong._id);
		}

		var song = _.extend(_.pick(attrs, "title"), {
			owner: attrs.owner,
			createdAt: new Date().getTime()
		});

		return Songs.insert(song);
	}
});