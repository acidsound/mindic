Meteor.publish('word', function (word, seq) {
  return [
    Words.find({name:word, word_sequence:seq-1}),
    Atoms.find({
      word_id: Words.findOne({name:word, word_sequence:seq-1})._id
    })
  ];
});