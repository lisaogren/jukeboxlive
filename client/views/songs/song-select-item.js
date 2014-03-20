Template.songSelectItem.helpers({

});


Template.songSelectItem.events({
    "change li.item input": function(e) {
        // e.preventDefault();

        // Retrieve checkbox
        var $el = $(e.currentTarget);

        // Invert the checkbox selection
        var newState = $el.attr("checked") == "checked" ? false : true;
        $el.attr("checked", newState);

        // console.log((newState ? "Selected" : "Unselected") + " song '" + this.title + "'");

        // Change classes on the li element to display the checkbox status
        $el.parent()[newState ? "addClass" : "removeClass"]("selected");
    }
});