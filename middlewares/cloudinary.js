import cloudinary from 'cloudinary'
import fs from "fs"
import dotenv from 'dotenv';

dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY_CLOUDINARY, 
    api_secret: process.env.API_SECRET_CLOUDINARY 
});

export default function uploadCloudinary(req, res, next) {
  const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  const hasValidImage = regex.test(req.body.image);

  if(!hasValidImage && req.file) {
    cloudinary.uploader.upload(req.file.path, (result, error) => {
      if(result) {
        req.body.uploadResult = result.secure_url;
        fs.unlinkSync(req.file.path);
        next();
      } else if(error){
        console.error(error);
        res.status(400).json({message:'bad picture!'});
      }
    });
  } else if (!hasValidImage) {
    res.status(400).json({message:'You need to add a valid picture'});
  } else {
    req.body.uploadResult = req.body.image;
    next();
  }
}
