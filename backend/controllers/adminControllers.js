let brcypt = require("bcrypt");
let jwt = require("jsonwebtoken");
require("dotenv").config();
const { userModel } = require("../models/userModel");

//login
let login = async(req,res)=>{
try{
    let {email,password} = req.body;
    if(!email||!password){
      return  res.status(401).json({
            success:false,
            message:"Fill all required fields"
        });
    }
    let data = await userModel.findOne({email:email});
    if(!data){
       return res.status(401).json({
            success:false,
            message:"Email does not exist"
        });
    }
    let pass = await brcypt.compare(password,data.password);
    if(!pass){
      return  res.status(401).json({
            success:false,
            message:"Password is incorrect"
        });
    }
    let datavalues = {
        user:{
            id:data._id
        }
    }
    let token  = jwt.sign(datavalues,process.env.JWT_PAS);
  return res.status(201).json({
        success:true,
        message:"Signed in successfully",
        token:token
    });
}
catch(error){
 return res.status(500).json({
        success:false,
        message:error.message
    });
}
}

//signup
let signup = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        if(!username||!email||!password){
          return res.status(401).json({
                success:false,
                message:"Fill all the required fields"
            });
        }
        let data = await userModel.findOne({
            email:email
        });
        if(data){
          return res.status(400).json({
                success:false,
                message:"Email already exists"
            });
        }
        let pass = await brcypt.hash(password,Number(process.env.BCRYPT_PAS));
        let savedDatas = new userModel({
            username:username,
            email:email,
            password:pass
        });
       let savedData = savedDatas.save();
        let dataValues ={
            user:{
                id:savedData._id
            }
        }
        let token = jwt.sign(dataValues,process.env.JWT_PAS)
        return res.status(200).json({
            success:true,
            message:"Signed up successfully",
            token:token
        });
    }
    catch(error){
      return res.status(500).json({
        success:false,
        message:error.message
    });
    }
}

// upload job
let uploadjob = async()=>{
    try{

    }
    catch(error){
         return res.status(500).json({
        success:false,
        message:error.message
    });  
    }
}

//get uploaded jobs
let getuploadedjobs = async(req,res)=>{
    try{

    }
    catch(error){
  return res.status(500).json({
        success:false,
        message:error.message
    });
    }
}

//get applicants
let getapplicants = async(req,res)=>{
    try{

    }
    catch(error){
 return res.status(500).json({
        success:false,
        message:error.message
    });
    }
}

//update applicant status
let status = async(req,res)=>{
try{

}
catch(error){
 return res.status(500).json({
        success:false,
        message:error.message
    });    
}
}
module.exports={signup,login};