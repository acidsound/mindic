Handlebars.registerHelper('isActive', function (siteName) {
  var current = Router.current();

  if ('undefined' !== typeof current && current !== null) {
    return current.route.name == siteName ? 'active' : 'not-active';
  }

  return 'not-active';
});
Handlebars.registerHelper('fromNow', function (utctime) {
  return moment(utctime).fromNow();
});
Handlebars.registerHelper('inc', function (number) {
  return (~~number)+1; // ~~ makes NaN to 0
});

