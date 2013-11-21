function loadUser(user) {
  var userAlreadyExists = typeof Meteor.users.findOne({ username: user.username }) === 'object';

  if (!userAlreadyExists) {
    log.debug('usercreate : ', db.user.username);
    var id = Accounts.createUser(user);
    Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});
    user.role && Roles.addUsersToRoles(id, user.role);
  }
}

Meteor.startup(function () {
  var users = YAML.eval(Assets.getText('users.yml'));

  for (key in users) if (users.hasOwnProperty(key)) {
    loadUser(users[key]);
  }
});