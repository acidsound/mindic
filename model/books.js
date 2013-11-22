Books = new Meteor.Collection('books');

Books.allow({
    insert : function () {
        return false;
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

