WordController = RouteController.extend({
  template: 'word',
  waitOn: function () {
    var word = Words.findOne({name: this.params.word, word_sequence: this.params.seq - 1}) || {_id: 0};
    return [
      Meteor.subscribe('word', this.params.word, this.params.seq)
    ];
  },
  data: function () {
    var _word = Words.findOne();
    return {
      name: this.params.word,
      word: _word,
      atoms: Atoms.find({word_id: _word && _word._id || ''})
    }
  }
});

Router.map(function () {
  this.route('word', {
    path: '/word/:word/:seq',
    controller: WordController
  });
});

