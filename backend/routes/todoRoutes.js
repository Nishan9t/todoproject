const express = require('express');
const todoModel = require('../models/todoModel');

const todoRoute = express.Router();

todoRoute.post("/todo/create",async(req,res)=>{
    try{

        const {title,description,userId}=req.body;
        if(!userId)
        {
            return res.send({code:402,message:"please login"})
        }
        if(!title || !description )
        {
            return res.send({code:403 , message:"data missing"})
        }

        const todo=new todoModel({...req.body});
        await todo.save();

        return res.send({code:200 , message:"todo created"})

    }
    catch(err)
    {
        return res.send({code:500 , message:"api error"})
    }
})



todoRoute.get("/todo/read/:userId",async(req,res)=>{
    try{
        
        const userId=req.params.userId;

        const todos=await todoModel.find({userId:userId});
       
            
        return res.send({code:200 , message:"all todos found" , alltodos:todos})

    }
    catch(err)
    {
        return res.send({code:500 , message:"api error"})
    }
})

todoRoute.delete("/todo/delete/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const todos=await todoModel.deleteOne({_id:id});
        return res.send({code:200 , message:"todo completed"})

    }
    catch(err)
    {
        return res.send({code:500 , message:"api error"})
    }
})

todoRoute.put("/todo/update/:id",async(req,res)=>{
    try{
        const id=req.params.id;

        const {title,description}=req.body;
        
        
        await todoModel.updateOne({_id:id},{title:title,description:description});

        res.send({code:200 , message:"todo updated"})

    }
    catch(err){
        return res.send({code :500 , message:"api error"})
    }
})



module.exports=todoRoute;