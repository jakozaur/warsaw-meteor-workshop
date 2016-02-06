var reactiveCounter = new ReactiveVar(0);
Meteor.startup(function () {
  Meteor.setInterval(function () {
    reactiveCounter.set(reactiveCounter.get() + 1);
    console.log("Counter: " + reactiveCounter.get());
  }, 1000);
});

Template.chat.helpers({
  messages: function() {
    return Messages.find({}, {sort: {creationTime: -1}});
  },
  counter: function() {
    return reactiveCounter.get();
  }
});

Template.chat.events({
  'click button': function(event, tmpl) {
    console.log("Button click!");
    var text = tmpl.$("input").val();
    Messages.insert({
      text: text,
      creationTime: Date.now()
    });
    tmpl.$("input").val("");
  }
})
