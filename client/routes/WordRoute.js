WordController = RouteController.extend({
  template: 'word',
  waitOn: function() {
    return [
      Meteor.subscribe('word', this.params.word, this.params.seq),
      Meteor.subscribe('atoms')
    ];
  },
  data: function() {
    var _word = Words.find().count() && Words.findOne() || '';
    log.debug(_word);
    return {
      name: this.params.word,
      word: _word,
      atoms: Atoms.find({word_id: '' || _word._id})
    }
  }
});

Router.map(function () {
  this.route('word', {
    path: '/word/:word/:seq',
    controller: WordController
  });
});

