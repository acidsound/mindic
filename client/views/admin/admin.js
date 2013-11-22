Template.admin.rendered= function() {
  log.debug('rendered');

  $('#user_list').handsontable({
    data: _.map(
      Meteor.users.find().fetch(), function(v) {
        return {
          date:moment(v.createdAt).format('YYYY-MM-DD'),
          username: v.username,
          address: v.emails[0].address,
          verified: v.emails[0].verified,
          role: v.roles&&v.roles.join(',')
        };
      }
    ),
    colHeaders:['date', 'username', 'address', 'verified', 'role'],
    colWidths: [100, 80, 120, 80, 80],
    columns: [
      { data: 'date', type: 'date'},
      { data: 'username', type: 'text'},
      { data: 'address', type: 'text'},
      { data: 'verified', type: 'checkbox'},
      { data: 'role', type: 'autocomplete', source:
        ['admin', 'founder', 'user', 'anonymous', 'creator', 'owner', 'booker', 'worder', 'atomer', 'cobooker']
      },
    ],
    colHeaders: true,
    rowHeaders: true,
    minSpareRows: 1
  });
}

Template.admin.helpers({
});

Template.admin.events({
});

