const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postId:{
        type: String,
        required: [true,"postId not defined"]
    },
    userId: {
        type: String,
        required: [true, "userId not provided"]
    },
    
    
});
module.exports = mongoose.model('Likes', postSchema);
