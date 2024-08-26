let InstaPost = require("../models/instapost");
let PostLike = require("../models/likes")
const fs = require('fs');
const path = require('path');
const postImagePath = path.join(__dirname, '../insta_post_images/');


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
            post_image: process.env.POST_IMAGES_URL + imageFileName
        });

        await instaPost.save();

        res.status(200).send({
            message: "post has been created"
        });
    } catch (err) {
        res.status(200).send({
            message: err.message
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
        let prevPostData = await InstaPost.findById(postId)
        
        console.log(req.user.id, prevPostData.post_user)
        
        if (!prevPostData) {
            return res.status(404).send({ message: "Post not found" });
        }

        if(req.user.id != prevPostData.post_user)
            return res.status(404).send({ message: "not authorized user" });

        prevPostData.post_title = req.body.post_title
        prevPostData.post_description = req.body.post_description       
        await InstaPost.updateOne({_id: prevPostData._id.toString()},{$set: prevPostData})

        res.status(200).send({ message: "" });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error updating post" });
    }
};

exports.get_single_post = async(req,res)=>{
    try {
        const postId = req.params.postId;
        const postDetails = await InstaPost.findById(postId)
        res.status(200).send({postDetails});
    } 
    catch (error) {
        res.status(500).send({ message: error.message || "Error deleting post" });
    }
}

exports.delete_insta_post = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await InstaPost.findById(postId)
        const postUserId = post.post_user
        console.log(postUserId,req.user.id)

        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        }

        if(postUserId == req.user.id)
        {
            await InstaPost.findByIdAndDelete(postId);
            return res.status(200).send({ message: "Post deleted successfully" });
        }
        else return res.status(400).send({message: "your r not the user"})


    } catch (error) {
        res.status(500).send({ message: error.message || "Error deleting post" });
    }
};

exports.get_user_posts = async(req,res)=>{
    try{
        let userId = req.params.userId
        let userPosts = await InstaPost.find({post_user:userId})


        return res.status(200).send({userPosts})
    }
    catch(err)
    {
        return res.status(200).send({msg: "something went wrong"})
    }
}

exports.set_post_like = async(req,res)=>{
    try{
        let userId = req.user.id;
        let postId = req.body.postId;
        const postLike = new PostLike({
            postId: postId,
            userId: userId
        });
        await postLike.save()
        // console.log(postId)
        return res.status(200).send("hello")
    }
    catch(err){
        return res.status(200).send({msg: "something went wrong"})
    }
}

exports.get_post_like = async(req,res)=>{
    try{
        let userId = req.user.id;
        let postId = req.body.postId;

        let like = await PostLike.findOne({ userId: userId, postId: postId });

        // if(like) return true else r
        console.log(like)
        return res.status(200).send({msg: "working"})
    }
    catch(err){
        return res.status(200).send({msg: "something went wrong with getting likes"})
    }
}


