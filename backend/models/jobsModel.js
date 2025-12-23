let mongoose = require("mongoose");

let jobschema = mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    recruiter_name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    desciption:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
        default:new Date()
    },
    applicants:{
        type:Number,
        default:0
    },
    visible:{
        type:Boolean,
        default:true,
        required:true,
    }
});

let jobsModel = mongoose.model("job",jobschema);
module.exports={jobsModel};
