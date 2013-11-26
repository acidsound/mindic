Atoms = new Meteor.Collection('atoms');

Atoms.allow({
  insert: canPostAtom,
  update: canEditAtom,
  remove: canEditAtom
});

// Use Meteor.methods for db operations
Meteor.methods({
  'addAtom': function(atom) {
    log.debug('--- addAtom ---');
    log.debug(atom);
    var atom_id = Meteor.user() && atom.description && atom.word_id && Atoms.insert({
      word_id: atom.word_id,
      description: atom.description,
      create_user: Meteor.user(),
      create_date: Date.now()
    });
    log.debug('new atom', atom_id, atom.word_id);
    if (atom_id) {
      Words.update({
        _id: atom.word_id
      }, {
        $push: {
          atoms: atom_id
        }
      });
    }
    return atom_id;
  },
  'updateAtom': function(attr) {
    log.debug('=== method update ===');
    var id=attr._id;
    delete attr._id;
    log.debug(attr);
    return Meteor.user() && Atoms.update({
      _id:id
    }, {$set: attr});
  },
  'deleteAtomAttribute': function(atom_id, attr) {
    var unset = {};
    unset[attr] = '';
    log.debug(atom_id, attr);
    return Meteor.user() && Atoms.update({
      '_id': atom_id
    }, {
      $unset: unset
    });
  }
});

