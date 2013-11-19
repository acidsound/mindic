Words = new Meteor.Collection('words');

Words.allow({
  insert: canPostWord,
  update: canEditWord,
  remove: canEditWord
});

// Use Meteor.methods for db operations
Meteor.methods({
  'wordPost': function(word) {
    user = Meteor.user();
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
    homonymCount = Words.find({name:word.name}).count();
    Words.insert({
      name: word.name,
      atoms: [
        {
          id: Meteor.uuid(),
          description: word.description,
          sequence: 0,
          create_user: user,
          create_date: Date.now()
        }
      ],
      atomCounts: 1,
      word_sequence: homonymCount,
      create_user: user,
      create_date: Date.now()
    });
    return word;
  },
  'addAtom': function(desc, word) {
    log.debug(desc, word);
    return Words.update({
      _id: word._id
    },
    {
      $push: {
        atoms: {
          id: Meteor.uuid(),
          description: desc,
          sequence: word.atomCounts,
          create_user: Meteor.user(),
          create_date: Date.now()
        }
      },
      $inc: {
        atomCounts:1
      }
    });
  },
  'updateAtom': function(attr, id) {
    log.debug('=== method update ===');
    log.debug(id);
    log.debug(attr);
    return Meteor.isServer && Words.update({
      _id:id,
      'atoms.id':attr.id
    }, {
      $set: {
        'atoms.$': attr
      }
    });
  },
  'deleteAtomAttribute': function(word_id, atom_id, attribute) {
    var unset = {};
    unset['atoms.$.'+attribute] = '';
    return Meteor.isServer && Words.update({
      _id: word_id,
      'atoms.id': atom_id
    }, {
      $unset: unset
    });
  }
});

