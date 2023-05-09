import petsModel from "../models/petsModel.js";

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
    uploadResult,
  } = req.body;

  try {
    const addThePet = await petsModel.addPetToDb(
      name,
      type,
      color,
      diet,
      weight,
      height,
      elergy,
      status,
      bread,
      bio,
      uploadResult
    );

    if (!addThePet) {
      res.status(401).send("something is not good");
      return;
    }

    res.status(200).json({ message: "upload is done" });
  } catch (err) {
    next(err);
  }
}

async function getSearchControl(req, res, next) {
  const { type, name, weight, height, status } = req.query;

  try {
    const searchThePet = await petsModel.getPetSearch(
      type,
      name,
      weight,
      height,
      status
    );

    if (!searchThePet.length) {
      res.status(401).send({ message: "Not found" });
      return;
    }

    res.status(200).send(searchThePet);
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
    uploadResult,
  } = req.body;

  const petId = req.params.petId;

  try {
    const updateThePet = await petsModel.updatePetDb(
      name,
      type,
      color,
      diet,
      weight,
      height,
      elergy,
      status,
      bread,
      bio,
      uploadResult,
      petId
    );

    if (!updateThePet) {
      res.status(401).send("something is not good");
      return;
    }

    res.status(200).json({
      message: "Update is done",
    });
  } catch (err) {
    next(err);
  }
}

async function takeUserPetsControl(req, res, next) {
  const { email } = req.params || "";

  try {
    const resultOfUserPets = await petsModel.getPetsOfUser(email);
    res.status(200).json({ resultOfUserPets });
  } catch (err) {
    next(err);
  }
}

async function makeAvilableController(req, res, next) {
  const { loginEmail } = req.body || "";
  const { id } = req.params || "";

  try {
    const result = await petsModel.makeAvialableDb(id, loginEmail);

    if (!result) {
      res.status(401).send({ message: "Not found" });
      return;
    }

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

async function getPetsOfUserControl(req, res, next) {
  const email = req.body.loginEmail;

  try {
    const resultOfFostered = await petsModel.getPetsOfUserFosterFromDB(email);
    const resultOfAdopted = await petsModel.getPetsOfUserAdoptFromDB(email);
    const resultOfSaved = await petsModel.getPetsOfUsesavedFromDB(email);

    if (!(resultOfSaved || resultOfFostered || resultOfAdopted)) {
      res.status(401).send({ message: "No pets saved, fostered or adopted" });
      return;
    }

    res.status(200).json({ resultOfSaved, resultOfFostered, resultOfAdopted });
  } catch (err) {
    next(err);
  }
}

async function getPetsControl(req, res, next) {
  try {
    const result = await petsModel.getPetsFromDB();

    if (!result) {
      res.status(401).send({ message: "You don't have pets!" });
      return;
    }

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

async function getPetByIdControl(req, res, next) {
  const { id } = req.params || "";

  try {
    const result = await petsModel.getPetByIdFromDB(id);

    if (!result) {
      res.status(401).send({ message: "Pet is not found!" });
      return;
    }

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

async function fosterControl(req, res, next) {
  const { loginEmail } = req.body || "";
  const { id } = req.params || "";

  try {
    const result = await petsModel.fosterDb(id, loginEmail);

    if (!result) {
      res.status(401).send({ message: "Not found" });
      return;
    }

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

async function adoptControl(req, res, next) {
  const { loginEmail } = req.body || "";
  const { id } = req.params || "";

  try {
    const result = await petsModel.adoptDb(id, loginEmail);

    if (!result) {
      res.status(401).send({ message: "Not found" });
      return;
    }

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

async function deletePetControl(req, res, next) {
  const { id } = req.params || "";

  try {
    const resultOfDeletePet = await petsModel.deletePetFromDb(id);

    if (!resultOfDeletePet) {
      res.status(401).send({ message: "Delete operation unsuccessful" });
      return;
    }

    res.status(200).json({ resultOfDeletePet });
  } catch (err) {
    next(err);
  }
}

export default {
  addPetControl,
  getSearchControl,
  adoptControl,
  updatePetControl,
  takeUserPetsControl,
  makeAvilableController,
  getPetsOfUserControl,
  fosterControl,
  getPetsControl,
  getPetByIdControl,
  deletePetControl,
};
