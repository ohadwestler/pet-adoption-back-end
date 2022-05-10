import express from "express";
import { db } from "../database.js";
import userController from "../controllers/userController.js";
import { validateToken } from "../middlewares/JWT.js";
import validation from "../middlewares/validation.js";
import { UserDetailsSchema } from "../middlewares/userSchema.js";
import { userLoginSchema } from "../middlewares/userSchema.js";

const router = express.Router();
router.get("/users/",validateToken, userController.sendIfAdminControl)

router.put("/changes/",validateToken, validation(UserDetailsSchema),userController.updateUserControl);

router.get("/login",validateToken, userController.checkTokenControl);

router.post("/adduser", validation(UserDetailsSchema), userController.signUpControl);

router.post("/auth", validation(userLoginSchema), userController.loginControl);


router.get("/disconnect", function(req, res){
    res.clearCookie('access-token');
    res.send("Cookie cleared")
      console.log("Cookie cleared");
  });






export default router;