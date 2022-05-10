import saveModel from "../modules/saveModel.js"
async function saveControl(req, res, next) {

    

  const loginEmail = req.body.loginEmail;

    const id = req.params.id


  try {
   
      const result = await saveModel.saveDb(id, loginEmail);
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

async function deleteSavedControl(req, res, next) {
    const id = req.params.id
    const loginEmail = req.body.loginEmail;

    try {
         
      const result = await saveModel.deleteSaveFromDb(loginEmail, id);
     
      if (!(result)) {
        res.status(401).json({ message: "No pets saved fosterd or adopted" });
      } else {
        res.status(200).send(result);
      }
    } catch (err) {
      next(err);
    }
   
}


export default { saveControl, deleteSavedControl};
