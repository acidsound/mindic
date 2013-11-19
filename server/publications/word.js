Meteor.publish('word', function (word, seq) {
  return Words.find({name:word, word_sequence:seq-1});
});

