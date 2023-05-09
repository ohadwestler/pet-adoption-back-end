import { promisify } from "util";
import { db } from "../database.js";

const promiseQuery = promisify(db.query).bind(db);

async function addPetToDb(
  name,
  type,
  color,
  diet,
  weight,
  height,
  allergy,
  status,
  bread,
  bio,
  uploadResult
) {
  try {
    const queryOfInsertingPet = `INSERT INTO pets (type, name, height, weight, color, hypo, breed, dietary, adoptionStatus, biography, uploadResult) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
    await promiseQuery(queryOfInsertingPet, [
      type,
      name,
      height,
      weight,
      color,
      allergy,
      bread,
      diet,
      status,
      bio,
      uploadResult,
    ]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function getPetsFromDB() {
  try {
    const queryPets = "SELECT * FROM pets";
    const allPets = await promiseQuery(queryPets);
    return allPets;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getPetSearch(type, name, weight, height, status) {
  try {
    const queryPets =
      "SELECT * FROM pets WHERE( type IS NOT NULL AND type like ? AND name IS NOT NULL AND name like ? AND weight IS NOT NULL AND weight like ? AND height IS NOT NULL AND height like ? AND adoptionStatus IS NOT NULL AND adoptionStatus like ?)";
    const allPets = await promiseQuery(queryPets, [
      type + "%",
      name + "%",
      weight + "%",
      height + "%",
      status + "%",
    ]);
    return allPets;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function updatePetDb(
  name,
  type,
  color,
  diet,
  weight,
  height,
  allergy,
  status,
  bread,
  bio,
  uploadResult,
  petId
) {
  try {
    const queryOfUpdatePet =
      "UPDATE pets SET type = ?, name = ?, height = ?, weight = ?, color = ?, hypo = ?, breed = ?, dietary = ?, adoptionStatus = ?, biography = ?, uploadResult = ? WHERE petsId = ?";
    await promiseQuery(queryOfUpdatePet, [
      name,
      type,
      height,
      weight,
      color,
      allergy,
      bread,
      diet,
      status,
      bio,
      uploadResult,
      petId,
    ]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function getPetByIdFromDB(id) {
  try {
    const queryOfPet = "SELECT * FROM pets WHERE petsId = ?";
    const petModule = await promiseQuery(queryOfPet, [id]);
    return petModule;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function adoptDb(id, email) {
  try {
    const queryOfOwner =
      "UPDATE pets SET owner = ?, adoptionStatus = ? WHERE petsId = ?";
    const status = "Adopted";
    await promiseQuery(queryOfOwner, [email, status, id]);
    const queryPets = "SELECT * FROM pets";
    const getpets = await promiseQuery(queryPets);
    return getpets;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function fosterDb(id, email) {
  try {
    const queryOfOwner =
      "UPDATE pets SET owner = ?, adoptionStatus = ? WHERE petsId = ?";
    const status = "Fostered";
    await promiseQuery(queryOfOwner, [email, status, id]);
    const queryPets = "SELECT * FROM pets";
    const getpets = await promiseQuery(queryPets);
    return getpets;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function makeAvailableDb(id, email) {
  try {
    const queryEmail = "SELECT * FROM pets WHERE petsId = ?";
    const isOwner = await promiseQuery(queryEmail, [id]);
    if (isOwner[0].owner === email) {
      const queryOfOwner =
        "UPDATE pets SET owner = ?, adoptionStatus = ? WHERE petsId = ?";
      const status = "Available";
      const newOwner = "";
      await promiseQuery(queryOfOwner, [newOwner, status, id]);
      const queryPets = "SELECT * FROM pets";
      const getpets = await promiseQuery(queryPets);
      return getpets;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getPetsOfUserAdoptFromDB(email) {
  try {
    const queryPets =
      "SELECT * FROM pets WHERE owner = ? AND adoptionStatus = ?";
    const status = "Adopted";
    const getpets = await promiseQuery(queryPets, [email, status]);
    return getpets;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getPetsOfUserFosterFromDB(email) {
  try {
    const queryPets =
      "SELECT * FROM pets WHERE owner = ? AND adoptionStatus = ?";
    const status = "Fostered";
    const getpets = await promiseQuery(queryPets, [email, status]);
    return getpets;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getPetsOfUserSavedFromDB(email) {
  try {
    const querySave =
      "SELECT * FROM pets INNER JOIN savepets ON pets.petsId= savepets.petsId WHERE email = ?";
    const getSaved = await promiseQuery(querySave, [email]);
    return getSaved;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getPetsOfUser(email) {
  try {
    const queryAllpets = "SELECT * FROM pets WHERE owner = ?";
    const allPets = await promiseQuery(queryAllpets, [email]);
    return allPets;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function deletePetFromDb(id) {
  try {
    const queryDeletepet = "DELETE FROM pets WHERE petsId = ?";
    const queryDeleteFromSaveModel = "DELETE FROM savepets WHERE petsId = ?";
    await promiseQuery(queryDeletepet, [id]);
    await promiseQuery(queryDeleteFromSaveModel, [id]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default {
  getPetsFromDB,
  addPetToDb,
  getPetSearch,
  updatePetDb,
  getPetByIdFromDB,
  adoptDb,
  fosterDb,
  makeAvailableDb,
  getPetsOfUserAdoptFromDB,
  getPetsOfUserFosterFromDB,
  getPetsOfUserSavedFromDB,
  getPetsOfUser,
  deletePetFromDb,
};
