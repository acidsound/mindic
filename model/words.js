Words = new Meteor.Collection('words');

Words.allow({
  insert: canPostWord,
  update: canEditWord,
  remove: canEditWord
});

// Use Meteor.methods for db operations
Meteor.methods({
  'wordPost': function (word) {
    var user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(601, 'You need to login');
    }
    if (!word.description) {
      throw new Meteor.Error(601, 'Please fill in a description');
    }
    word = _.extend(word, {
      name: word.name,
      sequence: 0,
      create_date: Date.now(),
      create_user: user
    });
    var homonymCount = Words.find({name: word.name}).count();
    var wordId = Words.insert({
      name: word.name,
      atoms: [],
      word_sequence: homonymCount,
      create_user: user,
      create_date: Date.now()
    });
    Meteor.call('addAtom', {
      word_id: wordId,
      description: word.description
    });
    return word;
  }
});

