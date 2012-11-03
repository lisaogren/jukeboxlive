/**
 * -----------------------------------------------------------------------------
 *  Meteor Models / Loaded on both server and client-side
 * -----------------------------------------------------------------------------
 */




/**
 * Initialize bands collection
 * @type {Meteor.Collection}
 */
Bands = new Meteor.Collection("bands");


/**
 * Define modification rights
 */
// Bands.allow({
// 	insert: function(userId, band) {
// 		return true;
// 	},
// 	update: function(userId, bands, fields, modifier) {
// 		// return _.all(bands, function(band) {
// 		// 	if (userId !== band.owner)
// 		// 		return false;



// 		// 	return true;
// 		// });
// 		return true;
// 	},
// 	remove: function(userId, bands) {
// 		// return ! _.any(bands, function(band) {
// 		// 	return userId !== band.owner;
// 		// });
// 		return true;
// 	}
// });




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
 * Meteor secure methods
 */
Meteor.methods({
	/**
	 * Create a new band in the collection
	 */
	createBand: function() {},

	/**
	 * Update an existing band in the collection
	 */
	updateBand: function() {},

	/**
	 * Create a concert
	 */
	createConcert: function() {},

	/**
	 * Update an existing concert
	 */
	updateConcert: function() {}
});