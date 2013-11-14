WordsController = RouteController.extend({
  template: 'words',
  data: function () {
    return {
      name: this.params.word,
      words: Words.find({name:this.params.word}, {sort:{word_sequence:1}})
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

