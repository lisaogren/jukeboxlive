// Initialize bands collection
Bands = new Meteor.Collection("bands");


Bands.allow({
  remove: Permissions.ownsBand,
  update: Permissions.ownsBand
});

Bands.deny({
  update: function(userId, band, fields) {
    return (_.without(fields, "name", "description").length > 0);
  }
});


Meteor.methods({
  "band:add": function(attrs) {
    var user = Meteor.user(),
        existingBand = Bands.findOne({ name: attrs.name });
    
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