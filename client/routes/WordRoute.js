WordController = RouteController.extend({
  template: 'word',
  waitOn: function () {
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

