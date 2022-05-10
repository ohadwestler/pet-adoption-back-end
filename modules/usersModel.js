import { promisify } from "util";
import { db } from "../database.js";

const promiseQuery = promisify(db.query).bind(db);

async function login(email) {
  const query = `select * from users WHERE email = ?`;
  const result = await promiseQuery(query, [email]); // use in async function
  if (result) {
    return result;
  } else {
    return false;
  }
}

async function update(
  bio,
  email,
  firstname,
  lastName,
  hash,
  phone,
  loginEmail
) {
  const queryIfExist = "SELECT email FROM users WHERE email = ? ";
  const queryOfInsertingUser =
    "UPDATE users SET bio = ? , email = ? , firstname = ? , lastName = ? , password = ? , phone = ? WHERE email = ?";
    const queryPets = "UPDATE pets SET owner = ? WHERE owner = ?";
    const querySavedPets =  "UPDATE savepets SET email = ? WHERE email = ?";


  const resultIfExist = await promiseQuery(queryIfExist, [email]);

  if (resultIfExist.length === 0 || loginEmail === resultIfExist[0].email) {
    const update = await promiseQuery(queryOfInsertingUser, [
      bio,
      email,
      firstname,
      lastName,
      hash,
      phone,
      loginEmail,
    ]);
    const updatePetsModel = await promiseQuery(queryPets, [email, loginEmail]);
    const updateSavePetModel = await promiseQuery(querySavedPets, [email, loginEmail]);
    return update;
  } else {
    return false;
  }
}


async function signUp(email, firstname, lastName, hash, phone) {
  const queryIfExist = "SELECT email FROM users WHERE email = ?";
  const queryOfInsertingUser = `INSERT INTO users (email,firstname, lastName, password, phone) VALUES (?,?,?,?,?)`;

  const resultIfExist = await promiseQuery(queryIfExist, [email]);

  if (resultIfExist.length === 0) {
    const inserting = await promiseQuery(queryOfInsertingUser, [
      email,
      firstname,
      lastName,
      hash,
      phone,
    ]);
    return inserting;
  } else {
    return false;
  }
}

async function checkIfAdmin(email) {
  const queryIfExist = "SELECT * FROM users WHERE email = ?";
  const queryAllUsers = "SELECT * FROM users";

  const resultIfExist = await promiseQuery(queryIfExist, [email]);
  if (resultIfExist[0].role === "admin") {
    const allUsers = await promiseQuery(queryAllUsers);
    return allUsers;
  } else {
    return false;
  }
}

export default { login, update, signUp, checkIfAdmin };
