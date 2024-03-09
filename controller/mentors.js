const db = require("./db");
const Student = require("../model/student");

const getMentorStudents = async (mentor) => {
    const data = await db.get({ name: mentor }, "mentors");
    if (!data) return [];
    const students = [];
    console.log(data)
    for (const st of data.students) {
        console.log(st);
        let student = await db.get({ rollno: st }, "students");
        // console.log(student)
        student = new Student(student.name, student.rollno, student.marks, student.mentor, student.stream);
        console.log(student)
        students.push(student);
    }

    return students;
}

const lockMentor = async (mentor) => {

    return db.update({ name: mentor }, { locked: true }, "mentors").then(d => console.log(d));
}

const unlockMentor = async (mentor) => {
    return db.update({ name: mentor }, { locked: false }, "mentors");
}

const mentorHasStudent = async (mentor, rollno) => {
    const mentorData = await db.get({ name: mentor }, "mentors");
    if (!mentorData) return false;
    return mentorData.students.includes(rollno);
}

const removeStudent = async (mentor, rollno) => {
    return db.update({ name: mentor }, { $pull: { students: rollno } }, "mentors");
}

const addStudent = async (mentor, rollno) => {
    return db.update({ name: mentor }, { $push: { students: rollno } }, "mentors");
}

const isLockMentor = async (mentor) => {
    const data = await db.get({ name: mentor }, "mentors");
    return data?.locked;
}

module.exports = {
    getMentorStudents,
    unlockMentor,
    lockMentor,
    mentorHasStudent,
    removeStudent,
    addStudent,
    isLockMentor
}