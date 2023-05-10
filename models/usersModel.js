import { promisify } from "util";
import { db } from "../database.js";

const promiseQuery = promisify(db.query).bind(db);

async function login(email) {
  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    const result = await promiseQuery(query, [email]);
    return result.length > 0 ? result : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function update(bio, email, firstname, lastName, hash, phone, loginEmail) {
  try {
    const queryIfExist = "SELECT email FROM users WHERE email = ? ";
    const queryOfInsertingUser = "UPDATE users SET bio = ? , email = ? , firstname = ? , lastName = ? , password = ? , phone = ? WHERE email = ?";
    const queryPets = "UPDATE pets SET owner = ? WHERE owner = ?";
    const querySavedPets = "UPDATE savepets SET email = ? WHERE email = ?";

    const resultIfExist = await promiseQuery(queryIfExist, [email]);
console.log(loginEmail, email);
    if (resultIfExist.length === 0 || loginEmail === resultIfExist[0].email) {
      await promiseQuery(queryOfInsertingUser, [bio, email, firstname, lastName, hash, phone, loginEmail]);
      await promiseQuery(queryPets, [email, loginEmail]);
      await promiseQuery(querySavedPets, [email, loginEmail]);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function signUp(email, firstname, lastName, hash, phone) {
  try {
    const queryIfExist = "SELECT email FROM users WHERE email = ?";
    const queryOfInsertingUser = `INSERT INTO users (email, firstname, lastName, password, phone) VALUES (?,?,?,?,?)`;

    const resultIfExist = await promiseQuery(queryIfExist, [email]);

    if (resultIfExist.length === 0) {
      await promiseQuery(queryOfInsertingUser, [email, firstname, lastName, hash, phone]);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function checkIfAdmin(email) {
  try {
    const queryIfExist = "SELECT role FROM users WHERE email = ?";
    const resultIfExist = await promiseQuery(queryIfExist, [email]);
    return resultIfExist[0]?.role === "admin" ? true : false;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function getUsers() {
  try {
    const queryAllUsers = "SELECT * FROM users";
    const allUsers = await promiseQuery(queryAllUsers);
    return allUsers;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default { login, update, signUp, checkIfAdmin, getUsers };
