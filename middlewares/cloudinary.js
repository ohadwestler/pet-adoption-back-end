import cloudinary from 'cloudinary'
import fs from "fs"
import dotenv from 'dotenv';

dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY_CLOUDINARY, 
    api_secret: process.env.API_SECRET_CLOUDINARY 
  });
export default function uploadCloudinary(req,res,next){
  const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if(!regex .test(req.body.image)){
    if(req.file!==undefined){
    cloudinary.uploader.upload(req.file.path,(result,error)=>{
      if(result){
        req.body.uploadResult = result.secure_url
        fs.unlinkSync(req.file.path)
        next()
      }else if(error){
            console.log(error)
            res.status(400).json({message:'bad picture!'})
      }
    })}
    else{res.status(400).json({message:'You need to add a valid picture'})}

 }
 else {
 req.body.uploadResult = req.body.image
 next()}
}




