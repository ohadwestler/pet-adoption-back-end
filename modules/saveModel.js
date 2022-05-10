
import { promisify } from "util";
import { db } from "../database.js";


const promiseQuery = promisify(db.query).bind(db);


async function saveDb(id, email){
    const queryOfSave =
    `INSERT INTO savepets (petsId, email, save) VALUES (?,?,?)`; 
    const saved = "saved"   
    
    const petModuleSave = await promiseQuery(queryOfSave, [id, email, saved]);
   return petModuleSave
  }


  async function deleteSaveFromDb(email, id){

    const queryOfSave =
    "DELETE FROM savepets WHERE email = ? AND petsId = ?"    
    const petModuleSave = await promiseQuery(queryOfSave, [email, id]);
   return petModuleSave
  }


  export default {saveDb, deleteSaveFromDb}