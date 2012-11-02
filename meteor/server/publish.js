/**
 * Publish the databases for use on client side
 */




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