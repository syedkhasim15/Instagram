const express = require('express')
const app = express()
const mongoose = require('mongoose')
const postRoutes = require("./routes/instapost.js");
const path = require("path")
const userRoutes = require("./routes/user");
require('dotenv').config()

const postImagePath = path.join(__dirname, './insta_post_images/');
const userImagePath = path.join(__dirname,"./user_images/")
app.use('/postimages', express.static(postImagePath));
app.use('/userimages', express.static(userImagePath));


try {
    mongoose.connect("mongodb://localhost:27017/instagram");
    console.log("connected to db");
} catch (error) {
    console.log('unhandledRejection', error.message);   
}
 
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(postRoutes);
app.use(userRoutes);

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is live on port 8000")
})