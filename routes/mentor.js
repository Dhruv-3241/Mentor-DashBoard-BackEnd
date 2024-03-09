const { Router } = require("express");
const StudentController = require("../controller/students");
const MentorController = require("../controller/mentors");
const router = Router();

router
  .post("/lock", async (req, res) => {
    const { mentor } = req.body;
    try {
      await MentorController.lockMentor(mentor);
      res.json({ message: "Mentor locked" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
  .post("/unlock", async (req, res) => {
    const { mentor } = req.body;
    try {
      await MentorController.unlockMentor(mentor);
      res.json({ message: "Mentor unlocked" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
  .post("/add", async (req, res) => {
    const { mentor, rollno } = req.body;
    try {
      await MentorController.addStudent(mentor, rollno);
      const studentData = await StudentController.getStudent({ rollno });
      if (!studentData) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      await StudentController.updateStudent({
        ...studentData.toJSON(),
        mentor,
      });
      res.json({ message: "Student added" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
  .post("/remove", async (req, res) => {
    const { mentor, rollno } = req.body;
    try {
      const studentData = await StudentController.getStudent({ rollno });
      if (!studentData) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      await StudentController.updateStudent({
        ...studentData.toJSON(),
        mentor: "",
      });
      await MentorController.removeStudent(mentor, rollno);
      res.json({ message: "Student removed" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }).get("/isLock", async (req, res) => {
    const { mentor } = req.body;
    try {
      const data = await MentorController.getMentor(mentor);
      res.json({ message: data.locked });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }).get("/students", async (req, res) => {
    const { mentor } = req.body;
    try {
      const students = await MentorController.getMentorStudents(mentor);
      res.json({
        data: students.map((student) => student.toJSON()),
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });

module.exports = router;
