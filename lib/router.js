// General Router configuration
Router.configure({
	layoutTemplate: "layout",
	loadingTemplate: "loading"
});


// Map application routes
Router.map(function() {
	// Add band form
	this.route("bandSubmit", {
		path: "/bands/add",
		disableProgress: true
	});

	// Display a single band
	this.route("bandPage", {
		path: "/bands/:_id",
		waitOn: function() {
			return [
				Meteor.subscribe("singleBand", this.params._id),
				Meteor.subscribe("bandSongs", this.params._id)
			];
		},
		data: function() {
			return Bands.findOne(this.params._id);
		}
	});

	// List of my bands
	this.route("myBandsList", {
		path: "/my-bands",
		waitOn: function() {
			return [Meteor.subscribe("myBands")];
		}
	});

	// List of bands
	this.route("bandsList", {
		path: "/bands",
		waitOn: function() {
			return [Meteor.subscribe("bands")];
		}
	});

	// Add event form
	this.route("eventSubmit", {
		path: "/events/add",
		waitOn: function() {
			return [
				Meteor.subscribe("myBands"),
				Meteor.subscribe("venues")
			];
		}
	});

	// Display a single event
	this.route("eventPage", {
		path: "/events/:_id",
		waitOn: function() {
			return [
				Meteor.subscribe("singleEvent", this.params._id),
				Meteor.subscribe("eventVenue", this.params._id)
			];
		},
		data: function() {
			return Events.findOne(this.params._id);
		}
	});

	// List of events
	this.route("eventsList", {
		path: "/",
		waitOn: function() {
			return Meteor.subscribe("events");
		}
	});
});


// Limit access to logged in users
Router.before(Permissions.requireLogin, {
	only: [
		"eventSubmit",
		"bandSubmit",
		"myBandsList"
	]
});


// Reset session values before each routing
Router.before(function() {
	Session.set("eventSubmit:currentBand", null);
});