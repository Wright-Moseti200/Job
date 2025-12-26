let cloudinary = require("cloudinary").v2;
let {CloudinaryStorage} = require("multer-storage-cloudinary");
let multer = require("multer");

cloudinary.config({
    cloud_name:"dvexzhis9",
    api_key:"357754644141572",
    api_secret:"W8QHODGRKexhcSpUXCfaHD6aVh4"
});

let storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder_name:"Job_portal",
        allowed_formats:["pdf","doc","docx","ppt"]
    }
});

let upload = multer({storage:storage});
module.exports={upload};