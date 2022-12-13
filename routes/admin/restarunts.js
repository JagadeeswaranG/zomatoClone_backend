var express = require("express");
const { connectDb, closeConnection } = require("../../config");
const { authenticate } = require("../../lib/authorize");
var router = express.Router();
const mongodb = require("mongodb");

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const db = await connectDb();
    const restarunts = await db.collection("restarunts").find().toArray();
    await closeConnection();
    res.json(restarunts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.post("/create", authenticate, async function (req, res, next) {
  try {
    const db = await connectDb();
    const restarunt = await db.collection("restarunts").insertOne(req.body);
    res.json({ message: "Restarunt Created Successfully" });
    await closeConnection();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/dish/:rId", authenticate, async function (req, res, next) {
  try {
    const db = await connectDb();
    // const restarunt = await db
    //   .collection("restarunts")
    //   .findOne({ _id: mongodb.ObjectId(req.params.rId) });
    // if (restarunt) {
    //   console.log(restarunt);
    // }
    const restarunt = await db
      .collection("dishes")
      .insertOne({ rId: mongodb.ObjectId(req.params.rId), ...req.body });
    res.json({ message: "Dish Added Successfully" });
    await closeConnection();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/dish/:rId", authenticate, async function (req, res, next) {
  try {
    const db = await connectDb();
    // const restarunt = await db
    //   .collection("restarunts")
    //   .findOne({ _id: mongodb.ObjectId(req.params.rId) });
    // if (restarunt) {
    //   console.log(restarunt);
    // }
    const restarunt = await db
      .collection("dishes")
      .find({ rId: mongodb.ObjectId(req.params.rId)}).toArray();
    await closeConnection();
    res.json(restarunt)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
