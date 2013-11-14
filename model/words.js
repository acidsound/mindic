Words = new Meteor.Collection('words');

Words.allow({
  insert: canPostWord,
  update: canEditWord,
  remove: canEditWord
});

// Use Meteor.methods for db operations
Meteor.methods({
  wordPost: function(word) {
    user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(601, 'You need to login');
    }
    if (!word.description) {
      throw new Meteor.Error(601, 'Please fill in a description');
    }
    homonymCount = Words.find({name:word.name}).count();
    word = _.extend(word, {
      word_sequence: homonymCount,
      create_date: Date.now()
    });

    Words.insert(word);
    return word;
  }
});

