const express = require("express");
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require("../modules/pool");

// GET all koalas?
koalaRouter.get("/", (req, res) => {
  let queryText = 'SELECT * FROM "koalla";'; //REMEMBER TO COME BACK
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error getting Koallas", error);
      res.sendStatus(500);
    });
});

// POST
koalaRouter.post("/", (req, res) => {
  let newKoala = req.body;
  console.log(`Adding koala`, newKoala);

  let queryText = `INSERT INTO "koalla" 
    ("Name", "Age", "Gender", "Ready for Transfer", "Notes")
    VALUES
    ($1, $2, $3, $4, $5);`; //REMEMBER TO COME BACK SDF

  pool
    .query(queryText, [
      newKoala.name,
      newKoala.age,
      newKoala.gender,
      newKoala.readyForTransfer,
      newKoala.notes,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding Koala`, error);
      res.sendStatus(500);
    });
});
// PUT

// DELETE

module.exports = koalaRouter;
