let mongoose = require("mongoose");
require("dotenv").config();

let connectDB = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/job`);
        console.log("Database is connected succesfully");
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports={connectDB};