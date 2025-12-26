let mongoose = require("mongoose");

let applicationSchema = mongoose.Schema({
    job_id:{
        type:String,
        required:true
    },
    applicant_name:{
        type:String,
        required:true
    },
    company_id:{
        type:String,
        required:true
    },
    job_title:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    status:{
        type:String,
        require:true,
        default:"pending"
    },
    date:{
        type:String,
        required:true,
        default:new Date()
    }
});

let appliactionModel = mongoose.model("application",applicationSchema);
module.exports = {appliactionModel};