Template.word.helpers({
  'isDisabled': function($key) {
    return _.contains(['create_date','create_user', 'name'], $key) ? 'disabled' : '';
  }
});

Template.word.events({
  'submit #addAtom': function() {
    var atomDescription = $('#addAtom #atom-description');
    Meteor.call('addAtom', {
      word_id: this.word._id,
      description: atomDescription.val()
    });
    atomDescription.val('');
    return false;
  },
  'submit .updateAtom': function(e) {
    var attributes = this;
    _.each($(".atom-attribute input.form-control", e.target).not('[disabled]'), function(v) {
      log.debug($(v).attr('data-content'));
      attributes[$(v).attr('data-content')]=$(v).val();
    });
    var new_key = $(".input-new-key", e.target).val().trim();
    var new_value = $(".input-new-value", e.target).val().trim();
    log.debug("new_key", new_key);
    log.debug("new_value", new_value);
    if (new_key && new_value) {
      log.debug("add attribute");
      attributes[new_key] = new_value;
      $(".input-new-key", e.target).val('');
      $(".input-new-value", e.target).val('');
    }
    var word_id = $(e.target).attr('data-logicalid');
    log.debug(attributes);

    Meteor.call('updateAtom', attributes, word_id);
    return false;
  },
  'click .remove-atom-attribute': function(e) {
    log.debug('remove attribute');
    var target=$(e.target).parent();
    log.debug($(target));
    Meteor.call('deleteAtomAttribute',
      $(target).attr('data-logicalid'),
      $(target).attr('data-title')
    );
    return false;
  }
});

