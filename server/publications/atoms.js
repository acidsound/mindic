Meteor.publish('atoms', function (wordid) {
  return Atoms.find({
    word_id: wordid
  });
});

