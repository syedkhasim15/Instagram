    var express = require("express"),

    router = express.Router(),
    {
        create_insta_post,
        update_insta_post,
        delete_insta_post,
        get_all_insta_post,
        get_user_posts
    } = require("../controllers/auth.js");

    const multer = require('multer');

    const verifyToken = require("../middlewares/authJWT.js");

    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    router.post("/protectedContent", verifyToken, (req,res) => {
        res.send("Authorized")
    })
    
    router.post("/insta-post",verifyToken, upload.single('post_image'), create_insta_post);
    router.put("/insta-post/:id", verifyToken, upload.single('post_image'), update_insta_post); 
    router.delete("/insta-post/:id", verifyToken, delete_insta_post);
    router.get("/insta-get-posts",verifyToken,get_all_insta_post)
    router.get("/insta-user-posts",verifyToken,get_user_posts)

    module.exports = router;