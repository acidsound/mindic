Template.words.events({
  "submit #wordPost": function() {
    Meteor.call('wordPost', {
      name: this.name,
      description: $("input[type=text].description").val()
    });
    $("input[type=text].description").val('');
    return false;
  }
});

