const User = require("../models/user");
const express = require('express');
const argon2 = require('argon2');

exports.get_user_by_id = async(req,res)=>{

    try{
        const userId = req.params.id
        const userData = await User.findById(userId)
        return res.status(200).send({message: userData})
    }
    catch(err)
    {
        return res.status(404).send({data: "something went wrong"})
    }

}

exports.update_user_details = async(req,res)=>{
    try{
        let userData = req.user._doc
        userData = {...userData,...req.body}
        userData.password = await argon2.hash(userData.password)
        console.log(userData)
        await User.updateOne({_id: userData._id.toString()},{$set: userData})
        return res.status(200).send({message: "helo"})
    }
    catch(err)
    {
        return res.status(400).send({message: "not working"})
    }
}

exports.get_user_details = async(req,res)=>{

    try{
        return res.status(200).send(req.user)
    }
    catch(err)
    {
        return res.status(404).send({data: "cant able to fetch the user details"})
    }
}
