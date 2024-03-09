const { Router } = require("express");
const StudentController = require("../controller/students");
const router = Router();

router
  .get("/all", async (req, res) => {
    try {
      const students = await StudentController.getAllStudents();
      res.json({
        data: students.map((student) => student.toJSON()),
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  })
  .get("/all/mentors/:mentor", async (req, res) => {
    try {
      const mentor = req.params.mentor;
      const students = await StudentController.getAllStudents({ mentor });
      // console.log(students);
      res.json({
        data: students.map((student) => student.toJSON()),
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  })
  .get("/:roll_no", async (req, res) => {
    try {
    const roll_no = req.params.roll_no;
    const student = await StudentController.getStudent({ rollno: roll_no });
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.json({
      data: student.toJSON(),
    });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  })
  .post("/", async (req, res) => {
    const { name, roll_no, marks, mentor, stream } = req.body;
    try {
      await StudentController.createStudent({
        name,
        rollno: roll_no,
        marks,
        mentor,
        stream,
      });
      res.json({ message: "Student created" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
  .patch("/:roll_no/marks", async (req, res) => {
    const { marks } = req.body;
    const roll_no = req.params.roll_no;
    try {
      const student = await StudentController.getStudent({ rollno: roll_no });
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      await StudentController.updateStudent({
        rollno: roll_no,
        marks,
        mentor: student.mentor,
        stream: student.stream,
        name: student.name,
      });
      res.json({ message: "Student marks updated" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
  .patch("/:roll_no/mentor", async (req, res) => {
    const { mentor } = req.body;
    const roll_no = req.params.roll_no;
    try {
      const student = await StudentController.getStudent({ rollno: roll_no });
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      await StudentController.updateStudent({ rollno: roll_no, mentor });
      res.json({ message: "Student mentor updated" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
  .delete("/:roll_no", async (req, res) => {
    const roll_no = req.params.roll_no;
    try {
      await StudentController.deleteStudent({ rollno: roll_no });
      res.json({ message: "Student deleted" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  });

module.exports = router;
