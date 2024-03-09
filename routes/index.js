const express = require("express");
const router = express.Router();
const StudentRoutes = require("./students");
const MentorRoutes = require("./mentor");

router
  .use("/students", StudentRoutes)
  .use("/mentors", MentorRoutes)
  .get("/", (req, res) => {
    res.json({
      message: "Welcome to the MentorDash API",
    });
  })
module.exports = router;
