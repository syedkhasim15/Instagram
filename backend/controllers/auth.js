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
            image: process.env.USER_IMAGES_URL+imageName
        });
 
        await user.save();
        res.status(200)
            .send({
                message: "User Registered Successfully"
            })
    } catch (err) {
        res.status(200)
            .send({
                message: "user alrady exist"
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
                image: user.image,
                role: user.role,
                created: user.created

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


