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
  .post("/bulkAdd", async (req, res) => {
    const { mentor, rollnos } = req.body;
    try {
      //console.log(rollnos)
      await MentorController.updateStudents(mentor, rollnos);
      for (let i = 0; i < rollnos.length; i++) {
        const rollno = rollnos[i];

        //console.log(rollno)
        const studentData = await StudentController.getStudent({ rollno });
        //console.log(studentData);
        if (!studentData) {
          res.status(404).json({ message: "Student not found" });
          return;
        }
        await StudentController.updateStudent({
          ...studentData.toJSON(),
          mentor,
          rollno,
        });
      }

      res.json({ message: "Students added" });
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
      console.log(studentData)
      await StudentController.updateStudent({
        ...studentData.toJSON(),
        rollno,
        mentor: "",
      });
      await MentorController.removeStudent(mentor, rollno);
      res.json({ message: "Student removed" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
  .post("/bulkRemove", async (req, res) => {
    const { mentor, rollnos } = req.body;
    try {
      for (const rollno of rollnos) {
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
      }
      res.json({ message: "Students removed" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
  .get("/:mentor/islock", async (req, res) => {
    const { mentor } = req.params;
    try {
      const data = await MentorController.isLockMentor(mentor);
      res.json({ message: data });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
  .get("/:mentor/students", async (req, res) => {
    const { mentor } = req.params;
    try {
      const students = await MentorController.getMentorStudents(mentor);
      res.json({
        data: students,
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });

module.exports = router;
