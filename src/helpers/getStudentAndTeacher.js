import Student from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";

export default async function getStudentAndTeacher (classroom) {
    const { students, teacher } = classroom;

    const studentsInfo = [];

    for (let i = 0; i < students.length; i++) {  
        const studentData = await Student.findOne({ registration: students[i] });
        if(!studentData) continue;
        studentsInfo.push(studentData)
    }

    let teacherData = await Teacher.findOne({ registration: teacher });
    if (!teacherData) teacherData = {};
    
    const updatedClassroom = { ...(classroom['_doc']), teacher: teacherData, students: studentsInfo, }
    console.log(updatedClassroom);
    
    return updatedClassroom;
}
