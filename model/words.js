Words = new Meteor.Collection('words');

Words.allow({
    insert : function () {
        return true;
    },
    update : function () {
        return false;
    },
    remove : function () {
        return false;
    }
});

// Use Meteor.methods for db operations
Meteor.methods({
});

