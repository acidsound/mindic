WordsController = RouteController.extend({
  template: 'words',
  waitOn: function() {
    return [Meteor.subscribe('words', this.params.word)];
  },
  data: function () {
    var words = Words.find({}, {sort: {word_sequence: 1}});
    return {
      name: this.params.word,
      words: words,
      count: words.length
    }
  }
});

Router.map(function () {
  this.route('words', {
    path: '/words/:word',
    controller: WordsController
  });
});

