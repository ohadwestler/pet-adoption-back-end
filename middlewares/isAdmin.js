import usersModel from "../models/usersModel.js";

export async function checkIfAdmin(req, res, next) {
  const loginEmail = req.body.loginEmail;

  try {
    const user = await usersModel.checkIfAdmin(loginEmail);
    if (!user) {
      res.status(401).send({ message: "You are not admin!" });
      return;
    }
    next();
  } catch (err) {
    res.status(401).send({ message: "problem with the server" });
  }
}
