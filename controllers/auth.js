var InstaPost = require("../models/instapost");
var jwt = require("jsonwebtoken");
const argon2 = require('argon2');
var User = require("../models/user");
const fs = require('fs');
const path = require('path');

const postImagePath = path.join(__dirname, '../insta_post_images/');
const userImagePath = path.join(__dirname,"../user_images/")

exports.signup = async (req,res) => {

    try{
        if(!req.file)
        {
            return res.status(400).send({err: "image should be uploaded"})
            
        }
        const imageBuffer = req.file.buffer
        const imageName = Date.now()+"-"+req.file.originalname
        fs.writeFileSync(userImagePath+imageName,imageBuffer)

        const password = await argon2.hash(req.body.password)
        const user = new User({
            fullName: req.body.fullName,
            email:req.body.email,
            role:req.body.role,
            password:password,
            image: userImagePath+imageName
        });
 
    
        await user.save();
        res.status(200)
            .send({
                message: "User Registered Successfully"
            })
    } catch (err) {
        res.status(500)
            .send({
                message: err
            });
            return;
    }
};
 
exports.signin = async (req,res) => {
 
    try {
        const user = await User.findOne({ email: req.body.email });
 
        if(!user) {
            return res.status(404)
                .send({
                    message: "User not found."
                });
        }
 
        var passwordIsValid = await argon2.verify(user.password, req.body.password)
 
        if (!passwordIsValid) {
            return res.status(401)
            .send({
                accessToken: null,
                message: "Invalid Password"
            });
 
        }
 
        var token = jwt.sign({
            id: user.id
        }, process.env.API_SECRET, {
            expiresIn: 86400
        });
 
        res.status(200)
        .send({
            user:
            {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
        },
        message: "Login successful",
        accessToken: token
    });
 
} catch (err) {
    console.log(err);
    res.status(500)
    .send({
        message: err
    });
    return;
    }
}


exports.create_insta_post = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({
                message: "Image file not provided"
            });
        }

        const imageBuffer = req.file.buffer;

        const imageFileName = Date.now() + '-' + req.file.originalname;
        fs.writeFileSync(postImagePath + imageFileName, imageBuffer);

        const instaPost = new InstaPost({
            post_title: req.body.post_title,
            post_description: req.body.post_description,
            post_user: req.user.id,
            // Store the path of the image in the database
            post_image: process.env.POST_IMAGES_URL + imageFileName
        });

        await instaPost.save();

        res.status(200).send({
            message: "post has been created"
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the post."
        });
    }
};

exports.get_all_insta_post = async(req,res)=>{

    try{
        let all_posts = await InstaPost.find();
        return res.status(200).send({message: all_posts})
    }
    catch(err)
    {
        return res.status(404).send({data: "something went wrong"})
    }

}

exports.update_insta_post = async (req, res) => {
    try {
        const postId = req.params.id;
        const prevPostData = await InstaPost.findById(postId)
        if (!prevPostData) {
            return res.status(404).send({ message: "Post not found" });
        }
        let img = process.env.POST_IMAGES_URL + req.file.originalname

        prevPostData.post_title = req.body.post_title
        prevPostData.post_description = req.body.post_description
        // prevPostData.post_image = img;
        await InstaPost.updateOne({_id: prevPostData._id.toString()},{$set: prevPostData})
        res.status(200).send({ message: "" });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error updating post" });
    }
};

exports.delete_insta_post = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await InstaPost.findById(postId)

        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        }
        
        await InstaPost.findByIdAndDelete(postId);

        res.status(200).send({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error deleting post" });
    }
};

exports.get_user_posts = async(req,res)=>{
    try{
        let userId = req.user.id
        let userPosts = await InstaPost.find({post_user:userId})
        return res.status(200).send({msg: userPosts})
    }
    catch(err)
    {
        return res.status(400).send({msg: "something went wrong"})
    }
}


