const topics = [
  "Ideation",
  "Evaluation",
  "Pitch",
  "Uniqueness",
  "Research",
  "Design",
];

class Student {
  constructor(name, roll_no, marks, mentor, stream,email) {
    marks = marks.slice(0, 6).map((mark, index) => {
      return {
        name: topics[index],
        value: Number(mark),
      };
    });
    //console.log(roll_no)
    this.#validate(name, roll_no, marks, mentor, stream,email);
    this.name = name;
    this.roll_no = roll_no;
    this.marks = marks ?? null;
    this.mentor = mentor ?? null;
    this.stream = stream;
    this.email = email;
  }
  /**
   * Description: use to valid correct data types
   * @typedef {{name:string, value:number}} Mark
   * @param {string} name
   * @param {string} roll_no
   * @param {Mark[]} marks
   * @param {string} mentor
   * @returns {void}
   */
  #validate(name, roll_no, marks, mentor, stream) {
    if (typeof name !== "string") {
      throw new Error("Name should be a string");
    }
    if (typeof roll_no !== "string") {
      throw new Error("Roll number should be a string");
    }
    if (typeof stream !== "string" && !["CSE", "ECE", "MEA"].includes(stream)) {
      throw new Error(
        "Stream should be a string and should be CSE, ECE or MEA"
      );
    }
    if (
      (marks?.length && !Array.isArray(marks)) ||
      marks.some(
        (mark) =>
          typeof mark.value !== "number" ||
          typeof mark.name !== "string" ||
          mark.value > 10 ||
          mark.value < 0
      )
    ) {
      throw new Error(
        "Marks should be a Array of {name: string, value: number} objects with value between 0 and 10"
      );
    }
    if (mentor && typeof mentor !== "string") {
      throw new Error("Mentor should be a string");
    }
  }

  toJSON() {
    return {
      name: this.name,
      roll_no: this.roll_no,
      marks: this.marks,
      mentor: this.mentor,
      stream: this.stream,
      email: this.email
    };
  }

  toDBJSON() {
    return {
      name: this.name,
      roll_no: this.roll_no,
      marks: this.marks.map(x => x.value.toString()),
      mentor: this.mentor,
      stream: this.stream,
      email: this.email
    };
  }
}

module.exports = Student;
