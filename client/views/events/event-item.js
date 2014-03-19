Template.eventItem.helpers({
  formattedDate: function() {
    return moment(new Date(this.when)).format("MMMM Do YYYY @ H:mm");
  }
});