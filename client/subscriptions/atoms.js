//Meteor.subscribe('atoms');
/*
_id:
word_id:
k1 : v1,
k2 : v2,
...
kn ; vn
related_word : word._id
synonyms: word.name

datatype_oracle : [{
  key_name: 'k1'
  data_type: varchar(100)
},{
  key_name: 'url'
  data_type: url_type
},{
  key_name: youtube
 ..
},{
  key_name: homonym
  data_type: wordlink
..
},{
  key_name: synonym
  data_type: varchar
]
*/
/*
batch - db.atoms.distinct('datatype.keyname')
Book
distinct_datatype:[]

Word
distinct_datatype:[]

*/
