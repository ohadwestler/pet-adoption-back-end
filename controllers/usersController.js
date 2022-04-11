import addUser from "../modules/usersModel.js"
import { uuid } from "uuidv4";

function userController(req, res) {
  const { firstname, email,lastName, password, phone } = req.body;
  const newUser = {
    firstname,
    email,
    lastName,
    password,
    phone,
    id: uuid()
    
  };

  const user = addUser(newUser);

  res.send(user);
}

export default userController