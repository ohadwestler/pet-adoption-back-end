import express from "express";
import validation from "../middlewares/validation.js";
import petsController from "../controllers/petsController.js";
import { validateToken } from "../middlewares/JWT.js";
import upload from "../middlewares/multer.js";
import uploadCloudinary from "../middlewares/cloudinary.js"
import { petsSchema } from "../middlewares/petsSchema.js";
import { searchPetSchema } from "../middlewares/petsSchema.js";

const router = express.Router();


router.post("/pets", validateToken,upload.single("image"), uploadCloudinary, validation(petsSchema),petsController.addPetControl)

router.put("/updatePet/:petId" ,validateToken, upload.single("image"), uploadCloudinary,validation(petsSchema) , petsController.updatePetControl)

router.get("/pet/user/:email/full",validateToken, petsController.takeUserPetsControl);

router.post("/pet/:id/return",validateToken, petsController.makeAvilableController);

router.get('/searchpet', validation(searchPetSchema) ,petsController.getSearchControl)

router.get("/pets", validateToken,petsController.getPetsControl);

router.get("/pet/user", validateToken, petsController.getPetsOfUserControl);

router.get("/pet/:id", petsController.getPetByIdControl);

router.post("/pet/:id/foster",validateToken, petsController.fosterControl);

router.post("/pet/:id/adopt",validateToken, petsController.adoptControl);

router.delete("/deletepet/:id",validateToken, petsController.deletePetControl)













export default router;