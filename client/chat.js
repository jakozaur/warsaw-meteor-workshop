var reactiveCounter = new ReactiveVar(0);

showLastMessages = new ReactiveVar(10);

Tracker.autorun(function () {
  Meteor.subscribe("lastMessages", showLastMessages.get());
});

Meteor.startup(function() {
  Meteor.setInterval(function() {
    reactiveCounter.set(reactiveCounter.get() + 1);
  }, 1000);
});

Template.chat.helpers({
  messages: function() {
    return Messages.find({}, {sort: {creationTime: -1}});
  },
  counter: function() {
    return reactiveCounter.get();
  },
  showLessButton: function() {
    return showLastMessages.get() > 10;
  },
  isMobile: function() {
    return Meteor.isCordova;
  }
});

Template.chat.events({
  'click #submit': function(event, tmpl) {
    console.log("Button click!");
    var text = tmpl.$("input").val();
    var username = "<anonymous>";
    if (Meteor.user() != null) {
      username = Meteor.user().profile.name;
    }

    Messages.insert({
      username: username,
      text: text,
      creationTime: Date.now()
    });
    tmpl.$("input").val("");
  },
  'click #show-more': function() {
    showLastMessages.set(showLastMessages.get() + 10);
  },
  'click #show-less': function() {
    showLastMessages.set(Math.max(showLastMessages.get() - 10, 10));
  }
})
