Template.bandPage.helpers({
	songs: function() {
		return Songs.find({}, {
			sort: {
				createdAt: 1
			}
		});
	},

	isOwner: function() {
		return Meteor.userId() && this.owner === Meteor.userId();
	}
});



Template.bandPage.events({
	"click .add-song": function(e) {
		e.preventDefault();

		var title = prompt("Enter the song name :");

		if (title !== null) {
			var song = {
				title: _.clean(title),
				owner: this._id
			};

			Meteor.call("song:add", song, function(error, id) {
				if (error) {
					alert(error.reason);
				}
			});
		}
	}
});