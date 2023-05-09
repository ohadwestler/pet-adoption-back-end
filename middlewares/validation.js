import Ajv from "ajv";
import addFormat from "ajv-formats";

const ajv = new Ajv();
addFormat(ajv);

export default function validation(schema) {
  const validate = ajv.compile(schema);

  return (req, res, next) => {
    const valid = validate(req.body);
    if (valid) {
      next();
    } else {
      res.status(400).send(validate.errors);
    }
  };
}
