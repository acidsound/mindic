Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    yieldTemplates: {
        'footer': { to: 'footer' },
        'menu': { to: 'menu' }
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