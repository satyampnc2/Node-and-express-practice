const mongoose = require('mongoose');

//Article Schema
let articleSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    author: {
        type: String,
        required:true
    },
    body: {
        type: String,
        required:true
    }
});

let Article  =  module.exports = mongoose.model('Article',articleSchema);

// 'Article' used must be The singular of the collection name and 
//must start with capital letter.