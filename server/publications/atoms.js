Meteor.publish('atoms', function () {
  return Atoms.find({});
});

Meteor.publish('atoms_of_word', function (wordid) {
  return Atoms.find({
    word_id: wordid
  });
});

