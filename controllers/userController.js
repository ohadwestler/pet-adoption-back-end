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

async function handleSuccessfulUpdate(
  res,
  user,
  email,
  firstname,
  lastName,
  bio,
  phone
) {
  const checkIfAdmin = await usersModel.checkIfAdmin(email);
  const accessToken = createTokens(user);
  res.cookie(process.env.TOKENKEY, accessToken, {
    maxAge: 3000 * 1000,
    httpOnly: false,
  });

  const responsePayload = {
    email,
    firstname,
    lastName,
    bio,
    phone,
    message: "updated!",
  };

  if (checkIfAdmin) {
    responsePayload.role = "admin";
  }

  res.status(200).json(responsePayload);
}

async function updateUserControl(req, res, next) {
  const {
    email,
    firstname,
    lastName,
    password,
    phone,
    confirmPasswad,
    bio,
    loginEmail,
  } = req.body;

  if (password !== confirmPasswad) {
    return res
      .status(400)
      .json({ message: "Password and confirm password are not the same" });
  }

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
      handleSuccessfulUpdate(res, user, email, firstname, lastName, bio, phone);
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
  const { email, firstname, lastName, password, phone, confirmPasswad } =
    req.body;

  if (password !== confirmPasswad) {
    return res
      .status(400)
      .json({ message: "Password and confirm password are not the same" });
  }

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
      res.cookie(process.env.TOKENKEY, accessToken, {
        maxAge: 3000 * 1000,
        httpOnly: false,
      });
      res.status(200).json({ email, firstname, lastName, phone });
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
        const accessToken = createTokens(user[0]);
        res.cookie(process.env.TOKENKEY, accessToken, {
          maxAge: 3000 * 1000,
          httpOnly: false,
        });
        res.json({ auth: true, accessToken, user });
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
