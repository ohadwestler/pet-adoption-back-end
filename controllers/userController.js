import bcrypt from "bcrypt";
import { createTokens } from "../middlewares/JWT.js";
import usersModel from "../models/usersModel.js";
import dotenv from "dotenv";

dotenv.config();

async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

async function handleSuccessfulUpdate(res, email, password) {
  const accessToken = createTokens({ email, password });
  res.status(200).json({ message: "updated!", accessToken });
}

async function passwordMatch(req, res) {
  const { password, confirmPasswad } = req.body;

  if (password !== confirmPasswad) {
    console.log(password, confirmPasswad);
    res
      .status(400)
      .json({ message: "Password and confirm password are not the same" });
    return false;
  }

  return true;
}

async function updateUserControl(req, res, next) {
  if (!(await passwordMatch(req, res))) return;

  const { email, firstname, lastName, password, phone, bio, loginEmail } =
    req.body;

  try {
    const hash = await hashPassword(password);
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
      res.status(401).send({ message: "Email already exists" });
    } else {
      handleSuccessfulUpdate(res, email, password);
    }
  } catch (err) {
    next(err);
  }
}

async function checkTokenControl(req, res, next) {
  const loginEmail = req.params.loginEmail;

  if (!loginEmail) {
    return res.json({ login: false, data: "error" });
  }

  try {
    const result = await usersModel.login(loginEmail);

    if (!result) {
      res.status(401).json({ message: "Token expired, please reconnect" });
    } else {
      res.status(200).json({ auth: true, result });
    }
  } catch (err) {
    res.status(401).json({ message: "Token expired, please reconnect" });
    next(err);
  }
}

async function signUpControl(req, res, next) {
  if (!(await passwordMatch(req, res))) return;

  const { email, firstname, lastName, password, phone } = req.body;

  try {
    const hash = await hashPassword(password);
    const user = await usersModel.signUp(
      email,
      firstname,
      lastName,
      hash,
      phone
    );

    if (!user) {
      res.status(401).send({ message: "Email already exists" });
    } else {
      const accessToken = createTokens({ email, password });
      res.status(200).json({ email, firstname, lastName, phone, accessToken });
    }
  } catch (err) {
    next(err);
  }
}

async function loginControl(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await usersModel.login(email);
    if (!user.length) {
      res.status(401).send("Email does not exist");
      return;
    }

    bcrypt.compare(password, user[0].password, (err, isPasswordValid) => {
      if (isPasswordValid) {
        const accessToken = createTokens({ email, password });
        res.status(200).json({ auth: true, user, accessToken });
      } else {
        res.status(401).send("Wrong password!");
      }
    });
  } catch (err) {
    next(err);
  }
}

async function getAllUsersControl(req, res, next) {
  try {
    const users = await usersModel.getUsers();
    if (!users) {
      res.status(401).send({ message: "Error in the server" });
    } else {
      res.status(200).json({ result: users });
    }
  } catch (err) {
    next(err);
  }
}

export default {
  updateUserControl,
  checkTokenControl,
  signUpControl,
  loginControl,
  getAllUsersControl,
};
