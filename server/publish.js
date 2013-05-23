/**
 * Publish the databases for use on client side
 */
// Meteor.publish("users", function() {
// 	return Meteor.users.find();
// });



/**
 * Publish the venues collection
 */
Meteor.publish("venues", function() {
	return Venues.find();
});


/**
 * Publish the available bands
 */
Meteor.publish("bands", function() {
	return Bands.find();
});



/**
 * Publish the available concerts
 */
Meteor.publish("concerts", function() {
	return Concerts.find();
});


/**
 * Publish songs
 */
Meteor.publish("songs", function() {
	return Songs.find();
});