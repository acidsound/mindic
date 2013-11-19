WordController = RouteController.extend({
  template: 'word',
  waitOn: function() {
    return [Meteor.subscribe('word', this.params.word, this.params.seq)];
  },
  data: function() {
    log.debug(Words.findOne());
    return {
      name: this.params.word,
      word: Words.findOne()
    }
  }
});

Router.map(function () {
  this.route('word', {
    path: '/words/:word/:seq',
    controller: WordController
  });
});

