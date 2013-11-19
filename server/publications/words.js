Meteor.publish('words', function (word) {
  return Words.find({name:word}, {sort: {word_sequence: 1}});
});

