Template.eventPage.helpers({
  formattedDate: function() {
    return moment(new Date(this.when)).format("MMMM Do YYYY @ H:mm");
  },
  venue: function() {
    return Venues.findOne(this.where);
  }
});