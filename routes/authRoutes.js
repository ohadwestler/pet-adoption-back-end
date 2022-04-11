import express from "express";
import authController from "../controllers/authController.js"
import userValidation from "../validation/userValidation.js"; 

const router = express.Router();

router.post("/login", userValidation, authController.login);

export default router;
