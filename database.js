import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  user: process.env.USEROFDB,
  host: process.env.HOSTDB,
  password: process.env.PASWORDOFDB,
  database: process.env.DATBASEOFDB,
  port: process.env.PORTOFDB,
  debug: false,
});

db.getConnection(function (err, connection) {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }

  console.log("Connected!");

  const sqlUsers =
    "CREATE TABLE if not exists users (email VARCHAR(45), firstname VARCHAR(45), lastName VARCHAR(45), password VARCHAR(500), phone VARCHAR(45), bio VARCHAR(45), role VARCHAR(45))";
  connection.query(sqlUsers, function (err, result) {
    if (err) console.error("Error creating users table: ", err);
    else console.log("Table of users created");
  });

  const sqlPets =
    "CREATE TABLE  if not exists pets(petsId INT NOT NULL AUTO_INCREMENT,type VARCHAR(45), name VARCHAR(45), color VARCHAR(45), hypo VARCHAR(45), breed VARCHAR(45) , biography VARCHAR(45), dietary VARCHAR(45), adoptionStatus VARCHAR(45), uploadResult VARCHAR(500), owner VARCHAR(45), weight INT, height INT, PRIMARY KEY (petsId))";
  connection.query(sqlPets, function (err, result) {
    if (err) console.error("Error creating pets table: ", err);
    else console.log("Table of pets created");
  });

  const sqlSaved =
    "CREATE TABLE if not exists savepets(petsId VARCHAR(45), email VARCHAR(45), save VARCHAR(45))";
  connection.query(sqlSaved, function (err, result) {
    if (err) console.error("Error creating savepets table: ", err);
    else console.log("Table of savepets created");
  });

  connection.release();
});
