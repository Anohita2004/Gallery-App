const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : String,
    caption : String,
    image : String
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;