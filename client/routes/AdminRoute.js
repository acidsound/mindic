filter = filter || {};

filter.isAdmin=function() {
  if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
    this.render('notFound');
    this.stop();
  }
}

AdminController = RouteController.extend({
  template: 'admin',
  waitOn: function() {
    return [Meteor.subscribe('allUsers')];
  },
  data: function() {
    return {
      users: Meteor.users.find()
    };
  },
  before: filter.isAdmin
});

Router.map(function () {
  this.route('admin', {
    path: '/admin'
  });
});

