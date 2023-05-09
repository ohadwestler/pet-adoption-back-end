import { promisify } from "util";
import { db } from "../database.js";

const promiseQuery = promisify(db.query).bind(db);

async function saveDb(id, email) {
  try {
    const queryOfSave = `INSERT INTO savepets (petsId, email, save) VALUES (?,?,?)`; 
    const saved = "saved";
    const petModuleSave = await promiseQuery(queryOfSave, [id, email, saved]);
    return petModuleSave;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function deleteSaveFromDb(email, id) {
  try {
    const queryOfSave = "DELETE FROM savepets WHERE email = ? AND petsId = ?";
    const petModuleSave = await promiseQuery(queryOfSave, [email, id]);
    return petModuleSave;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default { saveDb, deleteSaveFromDb };
