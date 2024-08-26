const express = require('express')
const app = express()
const mongoose = require('mongoose')
const postRoutes = require("./routes/instapost.js");
const userAuthRoutes = require("./routes/userauth.js");
const userRoutes = require("./routes/user.js")
const path = require("path")
require('dotenv').config()

const cors = require('cors');
app.use(cors());

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

app.use("/instagram/post",postRoutes);
app.use("/instagram/auth",userAuthRoutes);
app.use("/instagram/user",userRoutes)

app.listen(process.env.PORT || 8010, () => {
    console.log("Server is live on port 8010")
})