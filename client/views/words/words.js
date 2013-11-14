Template.words.helpers({
  words: function() {
    return this.words || this;
  },
  name: function() {
    return this.name || this;
  }
});

Template.words.events({
  "submit #wordPost": function() {
    Words.insert({
      name: this.name,
      description: $("input[type=text]").val(),
      create_date: Date.now()
    });
    $("input[type=text]").val('');
    return false;
  }
});

