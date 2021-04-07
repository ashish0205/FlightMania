"use strict";
const dbConnection = require("../config/sqldb");
const express = require("express");

const router = express.Router();

router.post("/search", async (req, res) => {
  const { departure, arrival } = req.body;
  let sql = `SELECT departure.airport as Departure,
  departure.iata as Diata,
  arrival.airport as Arrival,
  arrival.iata as Aiata,
  flight.Flight_number,
  airlines.Airline_name,
  airlines.iata
  FROM flight
  INNER JOIN departure on flight.flight_number=departure.flight_number
  INNER JOIN arrival on flight.flight_number=arrival.flight_number
  INNER JOIN airlines on flight.iata=airlines.iata
  where departure.timezone like '%${req.param("departure")}%'and
  arrival.Timezone like '%${req.param("arrival")}%'`;

  try {
    let searchBy = await dbConnection.query(sql, (err, data) => {
      if (err) {
        console.log(err);
      }
      res.json({
        status: 200,
        data,
        message: "data Recieved",
      });
    });

    if (!searchBy) {
      return res.status(200).json({
        msg: "Not able to save to cart",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
});

module.exports = router;
