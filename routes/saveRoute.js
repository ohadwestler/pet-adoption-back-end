import express from "express";
import { validateToken } from "../middlewares/JWT.js";
import savePetController from "../controllers/savePetController.js";

const router = express.Router();

router.post("/pet/:id/save", validateToken, savePetController.saveControl);

router.delete("/pet/:id/save", validateToken, savePetController.deleteSavedControl);

export default router;
