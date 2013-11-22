Meteor.publish('atoms_in_words', function (word) {
  return Atoms.find({word_id: {$in: Words.find({name:word}).fetch().map(function(v) { return v._id;})}});
});

Meteor.publish('atoms', function () {
  return Atoms.find({});
});

Meteor.publish('atoms_of_word', function (wordid) {
  return Atoms.find({
    word_id: wordid
  });
});

