Meteor.publish('words', function (word) {
  return Words.find({name:word});
});

Meteor.publish('recentWords', function() {
  return Words.find({}, {limit:10});
});

Meteor.publish('allWords', function () {
  return Words.find({});
});