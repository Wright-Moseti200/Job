let express = require("express");
let app = express();
let cors = require("cors");
let rateLimit = require("express-rate-limit");
const { connectDB } = require("./config/database");
const { userRoutes } = require("./routes/userRoutes");
require("dotenv").config();
let PORT = process.env.PORT || 4000;

let limit = rateLimit({
    windowMs:10*60*1000,
    max:100
});
app.use([cors(),express.json()]);
app.use(limit);
app.set("trust proxy",1);

connectDB();
app.get("/",(req,res)=>{
res.send("Express server is running");
});

app.use("/api/users",userRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});