import { promisify } from "util";
import { db } from "../database.js";

const promiseQuery = promisify(db.query).bind(db);

async function addPetToDb(name, type, color, diet, weight, height,elergy, status, bread, bio, uploadResult) {

    const queryOfInsertingPet = `INSERT INTO pets (type, name, height, weight, color, hypo, breed, dietary, adoptionStatus, biography, uploadResult) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
  

      const inserting = await promiseQuery(queryOfInsertingPet, [
        type, name, height, weight, color, elergy, bread, diet, status, bio, uploadResult
  
      ]);
      return inserting;
   
  }
  async function getPetsFromDB() {

    const queryPets = "SELECT * FROM pets";
  

      const allPets = await promiseQuery(queryPets);
      return allPets;
   
  }

  async function getPetSearch(type, name, weight, height, status) {

    const queryPets = 'SELECT * FROM pets WHERE( type IS NOT NULL AND type like ? AND name IS NOT NULL AND name like ? AND weight IS NOT NULL AND weight like ? AND height IS NOT NULL AND height like ? AND adoptionStatus IS NOT NULL AND adoptionStatus like ?)';
  

      const allPets = await promiseQuery(queryPets,[type+'%', name+'%', weight+'%', height+'%', status+'%']);
      return allPets;
   
  }


  async function updatePetDb(name, type, color, diet, weight, height,elergy, status, bread, bio, uploadResult, petId){
    const queryOfUpdatePet =
    "UPDATE pets SET type = ?, name = ?, height = ?, weight = ?, color = ?, hypo = ?, breed = ?, dietary = ?, adoptionStatus = ?, biography = ?, uploadResult = ? WHERE petsId = ?";

  const updateModule = await promiseQuery(queryOfUpdatePet, [name, type, height, weight, color,elergy, bread,  diet, status, bio, uploadResult, petId]);
  

    return updateModule;
  }


  async function getPetByIdFromDB(id){
    const queryOfPet =
    "SELECT * FROM pets WHERE petsId = ?";

  const petModule = await promiseQuery(queryOfPet, [id]);
  

    return petModule;
  }


  async function adoptDb(id, email){
    const queryOfOwner =
    "UPDATE pets SET owner = ?, adoptionStatus = ? WHERE petsId = ?";
    

const status = "Adopted"
  const petModuleOwner = await promiseQuery(queryOfOwner, [email,status, id]);
 
  const queryPets = "SELECT * FROM pets";
  const getpets = await promiseQuery(queryPets);
 
    return getpets;
  }


  async function fosterDb(id, email){
    const queryOfOwner =
    "UPDATE pets SET owner = ?, adoptionStatus = ? WHERE petsId = ?";
    

const status = "Fostered"
  const petModuleOwner = await promiseQuery(queryOfOwner, [email,status, id]);
 
  const queryPets = "SELECT * FROM pets";
  const getpets = await promiseQuery(queryPets);
 
    return getpets;
  }



  async function makeAvialableDb(id, email){

    const queryEmail = "SELECT * FROM pets WHERE petsId = ?";
    const isOwner = await promiseQuery(queryEmail, [id]);
    if(isOwner[0].owner === email){
    const queryOfOwner =
    "UPDATE pets SET owner = ?, adoptionStatus = ? WHERE petsId = ?";
    
    
    const status = "Available"
    const newOwner = ""
    const petModuleOwner = await promiseQuery(queryOfOwner, [newOwner,status, id]);
    const queryPets = "SELECT * FROM pets";
 
  const getpets = await promiseQuery(queryPets);
 
    return getpets;}
    else{
      return false
    }
  }

  async function getPetsOfUserAdoptFromDB(email){
    
    
    const queryPets = "SELECT * FROM pets WHERE owner = ? AND adoptionStatus = ?";
    const status = "Adopted"
 
  const getpets = await promiseQuery(queryPets, [email, status]);

  
  return getpets
 
  }

  async function getPetsOfUserFosterFromDB(email){
    
    
    const queryPets = "SELECT * FROM pets WHERE owner = ? AND adoptionStatus = ?";
    const status = "Fostered"
 
  const getpets = await promiseQuery(queryPets, [email, status]);

  
  return getpets
 
  }
  
  async function getPetsOfUsesavedFromDB(email){
    
  const querySave = "SELECT * FROM pets INNER JOIN savepets ON pets.petsId= savepets.petsId WHERE email = ?";
 const getSaved = await promiseQuery(querySave, [email]);
  
  return getSaved
 
  }


async function getPetsOfUser(email) {
  const queryAllpets = "SELECT * FROM pets WHERE owner = ?";
  const allPets = await promiseQuery(queryAllpets,[email]);
  if (allPets) {
    return allPets;
  } else {
    return false;
  }
}

async function deletePetFromDb(id){
  const queryDeletepet = "DELETE FROM pets WHERE petsId = ?";
  const queryDeleteFromSaveModel = "DELETE FROM savepets WHERE petsId = ?"
  const deletePet = await promiseQuery(queryDeletepet,[id]);
  if (deletePet) {
    const deleteSavedPet = await promiseQuery(queryDeleteFromSaveModel,[id]);
    return deletePet;
  } 
  else {
    return false;

}
}

  export default { getPetsFromDB, addPetToDb, getPetSearch, updatePetDb , getPetByIdFromDB, adoptDb, fosterDb, makeAvialableDb, getPetsOfUserAdoptFromDB,getPetsOfUserFosterFromDB, getPetsOfUsesavedFromDB, getPetsOfUser, deletePetFromDb}


 