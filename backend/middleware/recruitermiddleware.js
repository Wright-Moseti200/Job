let jwt = require("jsonwebtoken");
require("dotenv").config();
let auth = (req,res,next) =>{
    try{
        let token = req.header("recruiter-token");
        if(!token){
            res.status(401).json({
                success:false,
                message:"token unavailable"
            });
        }
        let data = jwt.verify(token,process.env.JWT_PAS);
        req.user = data.user;
        next();
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}