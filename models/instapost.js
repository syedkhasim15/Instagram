const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    post_user:{
        type: String,
        required: [true,"userid not defined"]
    },
    post_title: {
        type: String,
        required: [true, "Title not provided"]
    },
    post_description: {
        type: String,
        trim: true,
        required: [true, "Description not provided"]
    },
    post_image: {
        type: String,
        required: [true, "Image not provided"]
    },
    post_created: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('Post', postSchema);
