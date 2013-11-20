Meteor.publish('atoms', function (wordid) {
  return Atoms.find({wordid: wordid});
});

