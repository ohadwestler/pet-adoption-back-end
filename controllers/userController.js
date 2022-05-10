import { hash } from "bcrypt";
import bcrypt from "bcrypt";
import { createTokens } from "../middlewares/JWT.js";
import usersModel from "../modules/usersModel.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

async function updateUserControl(req, res, next) {
  const { email, firstname, lastName, password, phone, confirmPasswad, bio } =
    req.body;
    const loginEmail = req.body.loginEmail;

  if (password === confirmPasswad) {
    try {
      bcrypt.hash(password, 10, async (err, hash) => {
        const user = await usersModel.update(
          bio,
          email,
          firstname,
          lastName,
          hash,
          phone,
          loginEmail
        );
        if (!user) {
          res.status(401).send({ message: "Email is already exist" });
        } else {
          const checkIfAdmin = await usersModel.checkIfAdmin(email);

          const accessToken = createTokens({ email, password });

          res.cookie(process.env.TOKENKEY, accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: false,
          });
          checkIfAdmin
            ? res.status(200).json({
                email,
                firstname,
                lastName,
                hash,
                bio,
                phone,
                role: "admin",
                message: "updated!",
              })
            : res.status(200).json({
                email,
                firstname,
                lastName,
                hash,
                bio,
                phone,
                message: "updated!",
              });
        }
      });
    } catch (err) {
      next(err);
    }
  } else {
    return res
      .status(400)
      .json({ message: "Password and confirm Passwad are not the same" });
  }
}

async function checkTokenControl(req, res, next) {
  const loginEmail = req.params.loginEmail;
  if (loginEmail) {
    try {

      const result = await usersModel.login(loginEmail);

      if (!(result)) {
        res.status(401).json({ message: "Token expired, please reconnect" });
      } else {
        res.status(200).json({ auth: true, result });
      }
    } catch (err) {
      res.status(401).json({ message: "Token expired, please reconnect" });
      next(err);
    }
  } else {
    res.json({
      login: false,
      data: "error",
    });
  }
}

async function signUpControl(req, res, next) {
  const { email, firstname, lastName, password, phone, confirmPasswad } =
    req.body;
  if (password === confirmPasswad) {
    try {
      bcrypt.hash(password, 10, async (err, hash) => {
        const user = await usersModel.signUp(
          email,
          firstname,
          lastName,
          hash,
          phone
        );
        if (!user) {
          res.status(401).send({ message: "Email is already exist" });
        } else {
          const accessToken = createTokens({ email, password });

          res.cookie(process.env.TOKENKEY, accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: false,
          });
          res.status(200).json({ email, firstname, lastName, hash, phone });
        }
      });
    } catch (err) {
      next(err);
    }
  } else {
    return res
      .status(400)
      .json({ message: "Password and confirm Passwad are not the same" });
  }
}
async function loginControl(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await usersModel.login(email);
    if (!user.length) {
      res.status(401).send("Email is not exist");
      return;
    } else {
      bcrypt.compare(password, user[0].password, (err, responsePassword) => {
        if (responsePassword) {
          const accessToken = createTokens(user[0]);
          res.cookie(process.env.TOKENKEY, accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: false,
          });
          res.json({ auth: true, accessToken, user });
        } else {
          res.status(401).send("Worng password!");
        }
      });
    }
  } catch (err) {
    next(err);
  }
}

async function sendIfAdminControl(req, res, next) {
  const loginEmail = req.body.loginEmail;
  if (loginEmail) {
    try {
      const result = await usersModel.checkIfAdmin(loginEmail);
      if (!result) {
        res.status(401).send({ message: "You are not admin" });
      } else {
        res.status(200).json({ result });
      }
    } catch (err) {
      next(err);
    }
  } else {
    res.json({
      login: false,
      data: "error",
    });
  }
}

export default { updateUserControl, checkTokenControl, signUpControl, loginControl, sendIfAdminControl };
