Template.words.helpers({
  'ErrorAddWord':function() {
    return Session.get('ErrorAddWord');
  }
});

Template.words.events({
  "submit #wordPost": function() {
    Meteor.call('wordPost', {
      name: this.name,
      description: $("input[type=text].description").val()
    }, function(err, result) {
      Session.set('ErrorAddWord', err ? err.reason : void 0);
      $("#error-add-word.fadeInUp").live('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        log.debug('end')
        $(e.target).removeClass('fadeInUp').addClass('fadeOutUp');
      });
      $("#error-add-word.fadeOutUp").live('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        Session.set('ErrorAddWord');
      });
    });
    $("input[type=text].description").val('');
    return false;
  }
});

