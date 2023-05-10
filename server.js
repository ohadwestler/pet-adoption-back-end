import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import usersRoute from "./routes/usersRoute.js";
import petsRoute from "./routes/petsRoute.js";
import saveRoute from "./routes/saveRoute.js";

dotenv.config();

const app = express();
const { PORT, NODE_ENV } = process.env;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

if (NODE_ENV === "development") {
  corsOptions.origin = ["http://localhost:3000"];
} else {
  corsOptions.origin = ["https://ohad-pet-project.netlify.app"];
}

app.use(cors(corsOptions));

app.use(usersRoute)
app.use(petsRoute)
app.use(saveRoute)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;





