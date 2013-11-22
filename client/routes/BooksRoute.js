BooksController = RouteController.extend({
  template: 'books',
  data: function() {
    return {
      books:Books.find({})
    }
  }
});

Router.map(function () {
  this.route('books', {
    path: '/books',
    controller: BooksController
  });
});

