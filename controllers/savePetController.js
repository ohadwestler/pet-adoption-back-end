import saveModel from "../models/saveModel.js"

async function saveControl(req, res, next) {
  const { loginEmail } = req.body;
  const { id } = req.params;

  try {
    const result = await saveModel.saveDb(id, loginEmail);
    
    if (!result) {
      res.status(401).send({message: "Not found"});
      return;
    }

    res.status(200).send('suceessfully saved');
  } catch (err) {
    next(err);
  }
}

async function deleteSavedControl(req, res, next) {
  const { id } = req.params;
  const { loginEmail } = req.body;

  try {
    const result = await saveModel.deleteSaveFromDb(loginEmail, id);

    if (!result) {
      res.status(401).send({ message: "No pets saved fosterd or adopted" });
      return;
    }

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

export default { saveControl, deleteSavedControl };
