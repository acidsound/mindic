Atoms = new Meteor.Collection('atoms');

Atoms.allow({
  insert: canPostAtom,
  update: canEditAtom,
  remove: canEditAtom
});

// Use Meteor.methods for db operations
Meteor.methods({
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

