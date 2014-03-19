Template.songItem.helpers({
	isOwner: function() {
		var band = Bands.findOne(this.owner);

		return band && band.owner === Meteor.userId();
	}
});


Template.songItem.events({
	"click .delete": function(e) {
		e.preventDefault();

		if (confirm("Delete the song '" + this.title + "?")) {
			Songs.remove(this._id);
		}
	}
});