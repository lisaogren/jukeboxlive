Template.eventsList.helpers({
  events: function() {
    return Events.find();
  }
});