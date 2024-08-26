const express = require('express')
const router = express.Router()
const {get_user_by_id, get_user_details, update_user_details} = require("../controllers/insta-user")

const verifyToken = require("../middlewares/authJWT.js");

router.get('/getUser/:id',get_user_by_id)
router.get('/getUserDetails',verifyToken,get_user_details)
router.put('/update-user-details',verifyToken,update_user_details)

module.exports = router;