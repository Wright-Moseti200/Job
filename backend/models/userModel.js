let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resume:{
        type:String
    },
    created_at:{
        type:String,
        required:true,
        default:new Date()
    }
});

let userModel = mongoose.model("user",userSchema);
module.exports={userModel};
