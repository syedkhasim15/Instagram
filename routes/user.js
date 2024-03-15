var express = require("express"),
router = express.Router(),
{
    signup,
    signin
} = require("../controllers/auth.js");

const multer = require("multer")
const verifyToken = require("../middlewares/authJWT.js");

const storage = multer.memoryStorage();
const upload = multer({storage:storage})

router.post("/register",upload.single('image'), signup);
router.post("/login", signin);
router.post("/protectedContent", verifyToken, (req,res) => {
    res.send("Authorized")
});
module.exports = router;
