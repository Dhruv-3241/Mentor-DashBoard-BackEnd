const express = require("express");
const router = express.Router();
const StudentRoutes = require("./students");

router.use("/students", StudentRoutes).get("/", (req, res) => {
  res.json({
    message: "Welcome to the MentorDash API",
  });
});
module.exports = router;
