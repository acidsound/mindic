Meteor.publish('words', function (word) {
  return [
    Words.find({name:word}),
    Atoms.find({word_id: {$in: Words.find({name:word}).fetch().map(function(v) { return v._id;})}})
  ];
});

Meteor.publish('recentWords', function() {
  return Words.find({}, {limit:10});
});

Meteor.publish('allWords', function () {
  return Words.find({});
});