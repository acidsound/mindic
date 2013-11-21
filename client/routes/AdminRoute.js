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
  before: filter.isAdmin
});

Router.map(function () {
  this.route('admin', {
    path: '/admin'
  });
});

