Template.words.events({
  "submit #wordPost": function() {
    Meteor.call('wordPost', {
      name: this.name,
      description: $("input[type=text]").val()
    });
    $("input[type=text]").val('');
    return false;
  }
});

