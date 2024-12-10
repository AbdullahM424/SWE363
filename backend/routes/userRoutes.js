const express = require('express');
const jwt = require("jwt-simple");
const User = require("../models/User");
const router = express.Router();
const SECRET_KEY = "qs3h6z0JUN9wgTy1j2Cl54gB6yzG"

router.post("/register",async (req,res)=>{
    try{
        const {username,email,password} = req.body;
        if(await User.findOne({email})){
            console.log("alreadyExists")
            return res.status(401).json({error:"User already exists"});
        }
        const user = new User({
            "username":username,
            "email":email,
            "password":password,
            "type":"normal"
        });
        const payload = {"email":email};
        const token = jwt.encode(payload,SECRET_KEY);
        await user.save(); // store the user info in the DB
        res.status(201).json({message:"Registered Successfully",token});
    }
    catch(err){
        console.error("Error during save:", err); // Log the entire error object

    }
});

router.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({"email":email});        if(!user){
           return res.status(404).json({error:"no user was found with the given email"});
        }

        const payload = {"email":email};
        const token = jwt.encode(payload,SECRET_KEY);
        res.status(201).json({message:"Logged in successfully",token})
    }
    catch(err){
    
        res.status(500).json({error:"Internal Server Error"})
    }
});


router.get("/type",async (req,res)=>{
    try{
        if (!req.headers["x-auth"]) {
            return res.status(404).json({error: "Missing X-Auth header"});
         }
        const token = req.headers["x-auth"];
        const decoded = jwt.decode(token, SECRET_KEY);

        const user = await User.findOne({"email":decoded.email});
        console.log(user)
        const type = user.type;
        console.log(type)
         return res.status(200).json({"type":type}); 
    }
    catch(err){
        return res.status(500).json({err:err.message});
    }
})


module.exports = router;