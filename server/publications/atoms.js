Meteor.publish('atoms', function () {
  return Atoms.find({});
});