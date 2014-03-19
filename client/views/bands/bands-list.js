// Define a filter flag to display all or only bands owned by the current user
Session.set("bandsList:viewAll", true);


Template.bandsList.helpers({
  bands: function() {
    var options = {};
    
    // Define search options according to flags
    if (!Session.get("bandsList:viewAll")) {
      options.owner = Meteor.userId();
    }
    
    return Bands.find(options, { sort: { name: 1 } });
  },
  
  viewAll: function() {
    return Session.get("bandsList:viewAll");
  }
});


Template.bandsList.events({
  "click .show-my-bands": function(e) {
    e.preventDefault();
    
    // Invert the listing session flag
    Session.set("bandsList:viewAll", !Session.get("bandsList:viewAll"));
  }
});