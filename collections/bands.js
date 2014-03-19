// Initialize bands collection
Bands = new Meteor.Collection("bands");


/**
 * Define allow rules on bands
 */
Bands.allow({
    // Allow updates on the user's own bands
    update: Permissions.ownsBand,

    // Allow deletions on the user's own bands
    remove: Permissions.ownsBand
});


/**
 * Define deny rules on bands
 */
Bands.deny({
    // Verify that no injections were made on the update data
    update: function(userId, band, fields) {
        return (_.without(fields, "name", "description").length > 0);
    }
});


/**
 * Band server secure methods
 */
Meteor.methods({

    /**
     * Add a band
     *
     * @param  {object} attrs The attributes to compose the band
     * @return {string}       The generated band id
     */
    "band:add": function(attrs) {
        var user = Meteor.user(),
            existingBand = Bands.findOne({
                name: attrs.name
            });

        if (!user) {
            throw new Meteor.Error(401, "You need to login to add a band");
        }

        if (!attrs.name) {
            throw new Meteor.Error(422, "The band needs a name");
        }

        if (attrs.name && existingBand) {
            throw new Meteor.Error(406, "The band already exists", existingBand._id);
        }

        var band = _.extend(_.pick(attrs, "name", "description"), {
            owner: user._id,
            createdAt: new Date().getTime(),
            songs: []
        });

        return Bands.insert(band);
    }

});