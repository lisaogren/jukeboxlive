// Initialize events collection
Events = new Meteor.Collection("events");


/**
 * Events server secure methods
 */
Meteor.methods({

    /**
     * Add an event
     *
     * @param  {object} attrs The attributes to compose the event
     * @return {string}       The event id
     */
    "event:add": function(attrs) {

    }

});