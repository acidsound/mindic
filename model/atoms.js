Atoms = new Meteor.Collection('atoms');

Atoms.allow({
  insert: canPostAtom,
  update: canEditAtom,
  remove: canEditAtom
});

// Use Meteor.methods for db operations
Meteor.methods({
  'addAtom': function (atom) {
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
  'updateAtom': function (attr) {
    log.debug('=== atom-attr update ===');
    var id = attr._id;
    delete attr._id;
    log.debug(attr);
    Meteor.user() && Atoms.update({
      _id: id
    }, {$set: attr});
    if (Meteor.isClient) {
      Meteor.subscribe('atoms_of_word', attr.word_id);
    }
  },
  'deleteAtomAttribute': function (atom_id, attr) {
    log.debug('=== atom-attr delete ===', atom_id, attr);
    var unset = {};
    unset[attr] = '';
    Meteor.user() && Atoms.update({
      '_id': atom_id
    }, {
      $unset: unset
    });
    if (Meteor.isClient && atom_id) {
      var word = {word_id:'' } && Atoms.findOne({_id: atom_id})
      Meteor.subscribe('atoms_of_word', word.word_id);
    }
  },
  'deleteAtom': function(atom_id, word_id) {
    log.debug('=== atom delete', atom_id, word_id);
    Words.update({
      _id: word_id
    }, {
      $pull: {
        atoms: atom_id
      }
    });
    Atoms.remove(atom_id);
  }
});

