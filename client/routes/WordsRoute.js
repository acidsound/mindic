WordsController = RouteController.extend({
  template: 'words',
  data: function () {
    var words = Words.find({name:this.params.word}, {sort:{word_sequence:1}}).fetch();
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
  return {
    name: this.params
  }
});

