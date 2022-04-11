import fs  from "fs";

async function readUsers() {
  const response = await fs.promises.readFile("./users.json");
  return JSON.parse(response);
}

async function login() {
  app.post("/auth", (req, res) => {
    const { email, password } = req.body;
    db.query(
      "SELECT * FROM  users WHERE email = ? AND password = ?",
      [email, password],
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          if (result) {
            res.send(result);
          }
          else{
          res.send({ message: "worng email / password!" });}
        }
      }
    );
  });
}
export default {login}
