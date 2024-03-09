const db = require("./db");

const getMentorStudents = async (mentor) => {
    const data = await db.get({ name: mentor }, "mentors");
    if (!data) return [];
    const students = [];
    for (const st of data.students) {
        const student = await db.get({ rollno: st }, "students");
        students.push(student);
    }

    return students;
}

const lockMentor = async (mentor) => {
    return db.update({ name: mentor }, { locked: true }, "mentors");
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

module.exports = {
    getMentorStudents,
    unlockMentor,
    lockMentor,
    mentorHasStudent,
    removeStudent,
    addStudent
}