import fs from "fs"
function addUser(newUser) {

    const usersArray = JSON.parse(fs.readFileSync("./users.json"));
    usersArray.push(newUser);
    fs.writeFileSync("./users.json", JSON.stringify(usersArray));
    return usersArray;
}


export default addUser