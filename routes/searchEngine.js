"use strict";
const dbConnection = require("../config/sqldb");
const express = require("express");

const router = express.Router();

router.post("/search", async (req, res) => {
  const { departure, arrival } = req.body;
  console.log(departure, arrival);
  let sql = `SELECT departure.airport as Departure,
  departure.iata as Diata,
  departure.scheduled,
  arrival.airport as Arrival,
  arrival.iata as Aiata,
  arrival.scheduled as Ascheduled,
  flight.Flight_number,
  airlines.Airline_name,
  airlines.iata
  FROM flight
  INNER JOIN departure on flight.flight_number=departure.flight_number
  INNER JOIN arrival on flight.flight_number=arrival.flight_number
  INNER JOIN airlines on flight.iata=airlines.iata
  where departure.airport like '%${departure}%'and
  arrival.airport like '%${arrival}%'`;
  console.log(sql);

  try {
    let searchBy = await dbConnection.query(sql, (err, data) => {
      if (err) {
        res.json({ err });
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

router.post("/searchall", async (req, res) => {
  //const { departure, arrival } = req.body;
  let sql = `SELECT departure.airport as Departure,
  departure.iata as Diata,
  departure.scheduled,
  arrival.airport as Arrival,
  arrival.iata as Aiata,
  arrival.scheduled as Ascheduled,
  flight.Flight_number,
  airlines.Airline_name,
  airlines.iata
  FROM flight
  INNER JOIN departure on flight.flight_number=departure.flight_number
  INNER JOIN arrival on flight.flight_number=arrival.flight_number
  INNER JOIN airlines on flight.iata=airlines.iata
  where departure.airport like '%${req.param("departure")}%'and
  arrival.airport like '%${req.param("arrival")}%'`;

  try {
    let searchBy = await dbConnection.query(sql, (err, data) => {
      if (err) {
        console.log(err);
      }
      res.json({
        status: 200,
        data: {},
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

router.post("/arrivals", async (req, res) => {
  // const { departure, arrival } = req.body;
  let sql = `SELECT distinct airport FROM flights.arrival`;

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

router.post("/departure", async (req, res) => {
  // const { departure, arrival } = req.body;
  let sql = `SELECT distinct airport FROM flights.departure`;

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
