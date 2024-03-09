const db = require("./db");
const Student = require("../model/student");
const { mentorHasStudent } = require("./mentors");

const createStudent = async ({ name, rollno, marks, mentor,stream }) => {
  const student = new Student(name, rollno, marks, mentor, stream);
  await db.update({name: mentor}, { $push: { students: rollno } }, "mentors");
  return db.create(student.toJSON(), "students");
};

const updateStudent = async ({ name, rollno, marks, mentor,stream }) => {
  const student = new Student(name, rollno, marks, mentor, stream);
  if (!mentorHasStudent(mentor,rollno)) {
    await db.update({name: mentor}, { $push: { students: rollno } }, "mentors");
  }
  return db.update(
    {
      rollno,
    },
    student.toJSON(),
    "students"
  );
};

const deleteStudent = async ({ rollno }) => {
  await db.update({name: mentor}, { $pull: { students: rollno } }, "mentors");
  return db.delete(
    {
      rollno,
    },
    "students"
  );
};

const getStudent = async ({ rollno }) => {
  const data = await db.get(
    {
      rollno:rollno,
    },
    "students"
  );
  const student = new Student(data.name, data.rollno, data.marks, data.mentor,data.stream);
  return student;
};

const getAllStudents = async (filter) => {
  const data = await db.getAll(filter,"students");
  return data.map(
    (student) =>
      new Student(student.name, student.rollno, student.marks, student.mentor,student.stream)
  );
};

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
  getAllStudents,
};
