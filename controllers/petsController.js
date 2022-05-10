import petsModel from "../modules/petsModel.js";
import usersModel from "../modules/usersModel.js";

async function addPetControl(req, res, next) {
  const {
    name,
    type,
    color,
    diet,
    weight,
    height,
    status,
    bread,
    elergy,
    bio,
    uploadResult
  } = req.body;
  const loginEmail = req.params.loginEmail

  try {
    const user = await usersModel.checkIfAdmin(loginEmail);
  
    if (!user) {
      res.status(401).send({ message: "You are not admin!" });
    } else {
      const addThePet = await petsModel.addPetToDb(name, type, color, diet, weight, height,elergy, status, bread, bio, uploadResult);
      if (addThePet) {
        res
          .status(200)
          .json({
            name,
            type,
            color,
            diet,
            weight,
            height,
            status,
            elergy,
            bread,
            bio,
            message: "upload is done",
            uploadResult
          });
      } else {
        res.status(401).send("somthing is not good");
      }
    }
  } catch (err) {
    next(err);
  }
}

async function getSearchControl(req, res, next) {
  const {type, name, weight, height, status} = req.query

try {
 
    const searchThePet = await petsModel.getPetSearch(type, name, weight, height, status);
    if (searchThePet.length) {
      res
        .status(200)
        .send(searchThePet);
    } else {
      res.status(401).send({message: "Not found"});
    }
  
} catch (err) {
  next(err);
}
}

async function updatePetControl(req, res, next) {
  const {
    name,
    type,
    color,
    diet,
    weight,
    height,
    status,
    bread,
    elergy,
    bio,
    uploadResult
  } = req.body;
const loginEmail = req.params.loginEmail

  const petId = req.params.petId;
  
  try {
    const user = await usersModel.checkIfAdmin(loginEmail);
   
    if (!user) {
      res.status(401).send({ message: "You are not admin!" });
    } else {
      const updateThePet = await petsModel.updatePetDb(name, type, color, diet, weight, height,elergy, status, bread, bio, uploadResult, petId);
      if (updateThePet) {
        res
          .status(200)
          .json({
            name,
            type,
            color,
            diet,
            weight,
            height,
            status,
            elergy,
            bread,
            bio,
            message: "Update is done",
            uploadResult
          });
      } else {
        res.status(401).send("somthing is not good");
      }
    }
  } catch (err) {
    next(err);
  }
}

async function takeUserPetsControl(req, res, next) {
  const email = req.params.email;
  const admin = req.body.loginEmail

  if (admin) {
    try {
      const resultIfAdmin = await usersModel.checkIfAdmin(admin);
      if (!resultIfAdmin) {
        res.status(401).send({ message: "You are not admin" });
      } else {

        const resultOfUserPets = await petsModel.getPetsOfUser(email);
        res.status(200).json({ resultOfUserPets });
      }
    } catch (err) {
      next(err);
    }
  } else {
    res.json({
      login: false,
      data: "error",
    });
  }
}

async function makeAvilableController(req, res, next) {

    

  const loginEmail = req.body.loginEmail


  const id = req.params.id


try {
 
    const result = await petsModel.makeAvialableDb(id, loginEmail);
    if (result) {
      res
        .status(200)
        .send(result);
    } else {
      res.status(401).send({message: "Not found"});
    }
  
} catch (err) {
  next(err);
}
}

async function getPetsOfUserControl(req, res, next) {
  const email = req.body.loginEmail
  try {
    
    const resultOfFostered = await petsModel.getPetsOfUserFosterFromDB(email);
    const resultOfAdopted = await petsModel.getPetsOfUserAdoptFromDB(email);

    const resultOfSaved =  await petsModel.getPetsOfUsesavedFromDB(email);
  
    if (!(resultOfSaved||resultOfFostered || resultOfAdopted)) {
      res.status(401).send({ message: "No pets saved fosterd or adopted" });
    } else {
      res.status(200).json({resultOfSaved, resultOfFostered, resultOfAdopted});
    }
  } catch (err) {
    next(err);
  }
 
}

async function getPetsControl(req, res, next) {
  const loginEmail = req.body.loginEmail; 
  try {
      const user = await usersModel.checkIfAdmin(loginEmail);
     
      if (!user) {
        res.status(401).send({ message: "You are not admin!" });
      } else {
    const result = await petsModel.getPetsFromDB();
    if (!result) {
      res.status(401).send({ message: "You don't have pets!" });
    } else {
      res.status(200).send(result);
    }}
  } catch (err) {
    next(err);
  }
 
}

async function getPetByIdControl(req, res, next) {
  const id = req.params.id
  try {
       
    const result = await petsModel.getPetByIdFromDB(id);
    if (!result) {
      res.status(401).send({ message: "pet is not found!" });
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    next(err);
  }
 
}

async function fosterControl(req, res, next) {

    
  const loginEmail = req.body.loginEmail; 



  const id = req.params.id


try {
 
    const result = await petsModel.fosterDb(id, loginEmail);
    if (result) {
      res
        .status(200)
        .send(result);
    } else {
      res.status(401).send({message: "Not found"});
    }
  
} catch (err) {
  next(err);
}
}


async function adoptControl(req, res, next) {

    
  const loginEmail = req.body.loginEmail;


  const id = req.params.id


try {
 
    const result = await petsModel.adoptDb(id, loginEmail);
    if (result) {
      res
        .status(200)
        .send(result);
    } else {
      res.status(401).send({message: "Not found"});
    }
  
} catch (err) {
  next(err);
}
}

async function deletePetControl(req, res, next) {

  const id = req.params.id
  const admin = req.body.loginEmail

  if (admin) {
    try {
      const resultIfAdmin = await usersModel.checkIfAdmin(admin);
      if (!resultIfAdmin) {
        res.status(401).send({ message: "You are not admin" });
      } else {

        const resultOfDeletePet = await petsModel.deletePetFromDb(id);
        if(resultOfDeletePet){
        res.status(200).json({ resultOfDeletePet });
      }
      }
    } catch (err) {
      next(err);
    }
  } else {
    res.json({
      login: false,
      data: "error",
    });
  }

}










export default { addPetControl, getSearchControl, adoptControl, updatePetControl, takeUserPetsControl, makeAvilableController, getPetsOfUserControl, fosterControl, getPetsControl, getPetByIdControl, deletePetControl };
