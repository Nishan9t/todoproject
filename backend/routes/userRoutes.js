const express = require('express');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//creating user express route

const route = express.Router();

route.get("/hello",(req,res)=>{
    res.send("hello")
})

route.post("/auth/signup",async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        if(!name || !email || !password)
        {
            res.send({code:403 , message:"Some Data missing"});
        }
        //check if the user already exist or not
        const userExist= await userModel.findOne({email:req.body.email});
        if(userExist){
             return res.json({code:403 , message: 'User already exist with the give emailId'})
        }
        
         //hash the password
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(req.body.password,salt);
         //changing password with hash
         // req.body.password=hashPassword;
         
         //getting user with body same as req.body and change its password with hashPassword
         const user = new userModel({...req.body,password:hashPassword});
         await user.save();
         //creating token with id:user._id
         const token =await jwt.sign({id:user._id},"secretKey",{
             expiresIn:'24h'}
         );
         
     return res.send({code:200 ,token:token, message:'User registered successfully',user:user})


    }
    catch{
        return res.send({code:500 , message:"Api error"})
    }
})


route.post('/auth/login',async(req,res)=>{

    try{
        const {email,password}= req.body;
        
        //check emptiness of the incoming data
        if(!email || !password)
        {
            return res.send({ code :403 ,message:'Please enter all the details'});
        }

        //check if user already exist or not
        const userExist = await userModel.findOne({email:req.body.email});
        if(!userExist)
        {
            return res.send({code : 403, message:"Wrong credentials"});
        }

        //check password match
        const isPasswordMatched = await bcrypt.compare(password,userExist.password);
        if(!isPasswordMatched)
        {
            return res.json({code:403 ,message:"Wrong credentials pass"});
        }

        const token = await jwt.sign({id:userExist._id},"secretKey",{
            expiresIn:'24h'
        }
        );

        return res.send({code:200 ,token:token,message:"Logged in successfully",user:userExist});
        
    }
    catch(error)
    {
        return res.send({code:500,error:error})
    }



})


module.exports=route