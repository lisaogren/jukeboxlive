Template.bandSubmit.events({
  "submit form": function(e) {
    e.preventDefault();
    
    var $form = $(e.target);
    
    var band = {
      name: $form.find("[name=name]").val(),
      description: $form.find("[name=description]").val()
    };
    
    Meteor.call("band:add", band, function(error, id) {
      if (error) {
        alert(error.reason);
      } else {
        Router.go("bandPage", { _id: id });
      }
    });
  }
});