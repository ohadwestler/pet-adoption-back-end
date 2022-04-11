import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userController from "./controllers/usersController.js";
import mysql from "mysql";
import { response } from "express";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "Ohad",
  host: "localhost",
  password: "123456",
  database: "sugnup",
  port: "3306",
  debug: "true",
});

// app.use("/auth", authRoutes);

app.post("/api/adduser", (req, res) => {
  const { email, firstname, lastName, password, phone, confirmPasswad } =
    req.body;
  if (password === confirmPasswad) {
    db.query(
      "INSERT INTO users (email,firstname, lastName, password, phone) VALUES (?,?,?,?,?)",
      [email, firstname, lastName, password, phone],
      (err, result) => {
        
       res.status(200).send({email, firstname, lastName, password, phone});
      }
    );
  } else {
    return res.status(400).send({message:"Password and confirmPasswad are not the same"});
  }
});

app.post("/auth", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM  users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (result.length === 0) {
        res.status(401).send("Wrong email or password");
      } else {
        if (result) {
          res.status(200).send(result);
        }
        else{
        res.status(400).send({ message: "Worng email / password!" });
      }
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("Listening");
});
