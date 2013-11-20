ProfileUserController = RouteController.extend({
  template: 'profileUser',
  waitOn: function () {
    return [Meteor.subscribe('allUsers')];
  },
  data: function () {
    return _.extend({profile: {}}, Meteor.users.findOne({_id: this.params.id}));
  }
});

Router.map(function() {
  return this.route('profile', {
    path: '/profile',
    menu: 'main-menu',
    data: function() {
      return Meteor.user();
    }
  });
});

Router.map(function () {
  this.route('profileUser', {
    path: '/profile/:id',
    controller: ProfileUserController
  });
});