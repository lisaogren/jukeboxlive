Permissions = {
	requireLogin: function() {
		if (!Meteor.user()) {
			if (Meteor.loggingIn()) {
				this.render(this.loadingTemplate);
			} else {
				this.render("accessDenied");
			}
			this.stop();
		}
	},

	isOwner: function(userId, doc) {
		return doc && doc.owner === userId;
	},

	ownsBand: function(userId, doc) {
		return doc && doc.owner === userId;
	},

	ownsSong: function(userId, song) {
		var band = Bands.findOne(song.owner);
		return band && band.owner === userId;
	}
};