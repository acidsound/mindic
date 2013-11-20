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
  return (~~number) + 1; // ~~ makes NaN to 0
});
Handlebars.registerHelper('eq', function (obj1, obj2) {
  return obj1 === obj2;
});
Handlebars.registerHelper('in', function () {
  var l = arguments.length, i = 1;
  for (; i < l-1; i++) {
    if (arguments[0] === arguments[i]) {
      return true;
    }
  }
  return false;
});
Handlebars.registerHelper('toArray', function (obj) {
  var result = [];
  _.each(obj, function (value, key) {
    if (key !== '_id') {
      result.push({"$key": key, "$value": value});
    }
  });
  return result;
});
Handlebars.registerHelper('displayUser', function (user) {
  return "<a href='/profile/"+user._id+"'>"+user.username+"</a>";
});
Handlebars.registerHelper('debug', function (o) {
  log.debug('--debug--');
  log.debug(o);
  log.debug('==debug==');
  return o;
});

