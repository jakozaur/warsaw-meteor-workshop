Template.chat.helpers({
  messages: function() {
    return Messages.find();
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
