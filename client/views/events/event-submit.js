// Define session variables
Session.set("eventSubmit:currentBand", null);
Session.set("eventSubmit:selectedSongs", []);


/**
 * Realtime data dependencies
 */
Deps.autorun(function() {
    return Meteor.subscribe("bandSongs", Session.get("eventSubmit:currentBand"));
});



/**
 * Template helpers
 */
Template.eventSubmit.helpers({
    songs: function() {
        var band = Session.get("eventSubmit:currentBand");

        return band && Songs.find({
            owner: band
        });
    },

    bandSelected: function() {
        return Session.get("eventSubmit:currentBand") !== null;
    }
});


/**
 * Template events
 */
Template.eventSubmit.events({

    /**
     * Submitting the events add form
     *
     * @param  {object} e Event object
     */
    "submit form": function(e) {
        e.preventDefault();

        var $el = $(e.target);

        // Build event data
        var event = {
            title: $el.find("[name=title]").val(), // @todo auto-generate event title from other data ?
            who: $el.find("[name=who-id]").val(),
            when: $el.find("[name=when]").val(),
            where: $el.find("[name=where-id]").val()
        };

        // List all selected songs
        var songs = [];

        $el.find(".list input:checked").each(function() {
            songs.push($(this).val());
        });

        // Check that at least one song is selected
        if (!songs.length) {
            alert("Select at least one song");
            return false;
        }

        console.log("Generated data: ", event, songs);
    }

});



/**
 * Template render callback
 */
Template.eventSubmit.rendered = function() {
    // Retrieve form elements
    var $who = $(this.find("[name=who]")),
        $when = $(this.find("[name=when]")),
        $where = $(this.find("[name=where]")),
        $desc = $(this.find(".title .description")),
        data = [];

    // if (!$who.hasClass("ui-autocomplete-input")) {
    console.log("Initializing jQuery UI plugins");

    // Map band data for the autocomplete
    var bands = Bands.find({}, {
        sort: {
            name: 1
        }
    }).map(function(band) {
        return {
            "value": band._id,
            "label": band.name
        };
    });

    // Map venues data for the autocomplete
    var venues = Venues.find({}, {
        sort: {
            name: 1
        }
    }).map(function(venue) {
        return {
            "value": venue._id,
            "label": venue.name
        };
    });

    // Initialize band autocomplete
    $who.autocomplete({
        minLength: 0,
        source: bands,
        focus: function(event, ui) {
            $who.val(_.trim(ui.item.label));
            $who.next().val(ui.item.value);
            return false;
        },
        select: function(event, ui) {
            $who.val(_.trim(ui.item.label));
            $who.next().val(ui.item.value);
            return false;
        },
        change: function(event, ui) {
            // Check if an existing band was selected
            if ($who.val() !== "" && (!ui.item || !Bands.findOne(ui.item.value))) {
                console.log("Unexisting band selected: " + $who.val());

                alert("Band does not exist");

                // Empty the songs list
                Session.set("eventSubmit:currentBand", null);
            } else if ($who.val() === "") {
                console.log("No band selected");

                // Empty the songs list
                Session.set("eventSubmit:currentBand", null);
            } else {
                console.log("Selected band: " + ui.item.label);

                // Retrieve the selected band
                var band = Bands.findOne(ui.item.value);

                // Store the currently selected band
                Session.set("eventSubmit:currentBand", band._id);
            }
            return false;
        }
    });


    // Initialize date/time picker
    $when.datetimepicker({
        format: "d/m/Y H:i"
    });

    // Initialize venues autocomplete
    $where.autocomplete({
        minLength: 0,
        source: venues,
        focus: function(event, ui) {
            $where.val(_.trim(ui.item.label));
            $where.next().val(ui.item.value);
            return false;
        },
        select: function(event, ui) {
            $where.val(_.trim(ui.item.label));
            $where.next().val(ui.item.value);
            return false;
        },
        change: function(event, ui) {
            if ($where.val() !== "" && (!ui.item || !Venues.findOne(ui.item.value))) {
                alert("Venue does not exist");
            }
            return false;
        }
    });
    // } else {
    // 	console.log("jQuery UI plugins already initialized");
    // }
};