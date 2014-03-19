Template.bandItem.helpers({
	isOwner: function() {
		return Meteor.userId() && this.owner === Meteor.userId();
	}
});


Template.bandItem.events({
	"click .delete": function(e) {
		e.preventDefault();

		if (confirm("Delete this band?")) {
			Bands.remove(this._id);
			//Router.go("myBandsList");
		}
	}
});