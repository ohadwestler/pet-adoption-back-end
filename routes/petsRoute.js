import express from "express";
import petsController from "../controllers/petsController.js";
import { validateToken } from "../middlewares/JWT.js";
import upload from "../middlewares/multer.js";
import uploadCloudinary from "../middlewares/cloudinary.js";
import { petsSchema, searchPetSchema } from "../middlewares/petsSchema.js";
import validation from "../middlewares/validation.js";
import { checkIfAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/pets", validateToken, checkIfAdmin, upload.single("image"), uploadCloudinary, validation(petsSchema), petsController.addPetControl);

router.put("/updatePet/:petId", validateToken, checkIfAdmin, upload.single("image"), uploadCloudinary, validation(petsSchema), petsController.updatePetControl);

router.get("/pet/user/:email/full", validateToken, checkIfAdmin, petsController.takeUserPetsControl);

router.post("/pet/:id/return", validateToken, petsController.makeAvilableController);

router.get('/searchpet', validation(searchPetSchema), petsController.getSearchControl);

router.get("/pets", validateToken, checkIfAdmin, petsController.getPetsControl);

router.get("/pet/user", validateToken, petsController.getPetsOfUserControl);

router.get("/pet/:id", petsController.getPetByIdControl);

router.post("/pet/:id/foster",validateToken, petsController.fosterControl);

router.post("/pet/:id/adopt",validateToken, petsController.adoptControl);

router.delete("/deletepet/:id",validateToken, checkIfAdmin, petsController.deletePetControl);

export default router;
