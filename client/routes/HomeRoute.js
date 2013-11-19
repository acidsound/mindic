var HomeController = RouteController.extend({
  template: 'home',
  waitOn: function() {
    return [Meteor.subscribe('allWords')];
  },
  data: function() {
    var wordCount = Words.find({}).count();
    Meteor.subscribe('recentWords');
    return {
      wordCount: wordCount,
      recentWords: Words.find({}, {sort:{create_date: -1}, limit: 10})
    }
  }
});

Router.map(function () {
  this.route('home', {
    path: '/',
    controller: HomeController,
    menu: 'main-menu',
    weight: 0
  });
});

