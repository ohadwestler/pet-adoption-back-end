import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import usersRoute from "./routes/usersRoute.js"
import petsRoute from "./routes/petsRoute.js"
import saveRoute from "./routes/saveRoute.js"
import dotenv from 'dotenv';
import { env } from "process";

dotenv.config()
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(usersRoute)
app.use(petsRoute)
app.use(saveRoute)


app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
